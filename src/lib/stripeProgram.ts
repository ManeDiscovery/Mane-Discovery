import Stripe from 'stripe';

// Verified LIVE Price IDs for Mane Discovery
export const PROGRAM_PRICE_BASIC = 'price_1TC6PWKc0Q7fCTw7e2CciHp8'; // $39: 21-Day Somatic Journey
export const PROGRAM_PRICE_PREMIUM = 'price_1TGJrpKc0Q7fCTw7NeMVjpuj'; // $97: Guided Embodiment Cohort
export const IN_PERSON_PRICE_135 = 'price_1T8OyVKc0Q7fCTw7zClyzwYq'; // $135: In-person session (NOT program)

export type ProgramTier = 'basic' | 'premium';

export const APPROVED_PROGRAM_PRICE_MAP: Record<string, ProgramTier> = {
  [PROGRAM_PRICE_BASIC]: 'basic',
  [PROGRAM_PRICE_PREMIUM]: 'premium',
};

/**
 * Identify program tier strictly based on approved program price IDs.
 * Never infers tier from payment amount, and never falls back to premium for unknown purchases.
 */
export function getProgramTierFromPriceIds(priceIds: string[]): ProgramTier | null {
  if (priceIds.includes(PROGRAM_PRICE_PREMIUM)) {
    return 'premium';
  }
  if (priceIds.includes(PROGRAM_PRICE_BASIC)) {
    return 'basic';
  }
  return null;
}

/**
 * Retrieve complete line items from Stripe for a given checkout session.
 */
export async function retrieveSessionLineItemPriceIds(
  stripe: Stripe,
  sessionId: string
): Promise<string[]> {
  const priceIds: string[] = [];
  let startingAfter: string | undefined = undefined;
  let hasMore = true;

  while (hasMore) {
    const response: Stripe.ApiList<Stripe.LineItem> = await stripe.checkout.sessions.listLineItems(sessionId, {
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    const items: Stripe.LineItem[] = response.data || [];
    for (const item of items) {
      if (item.price?.id) {
        priceIds.push(item.price.id);
      }
    }

    hasMore = Boolean(response.has_more);
    if (items.length > 0) {
      startingAfter = items[items.length - 1].id;
    } else {
      hasMore = false;
    }
  }

  return priceIds;
}

// In-memory cache to prevent race conditions during rapid retries in the same process
const fulfilledSessionCache = new Set<string>();

export function isSessionCachedAsFulfilled(sessionId: string): boolean {
  return fulfilledSessionCache.has(sessionId);
}

export function markSessionCachedAsFulfilled(sessionId: string): void {
  fulfilledSessionCache.add(sessionId);
}

export function clearSessionCacheForTesting(): void {
  fulfilledSessionCache.clear();
}

/**
 * Check whether a checkout session ID has already been fulfilled persistently.
 * Checks:
 * 1. Process in-memory cache
 * 2. Stripe session metadata (`program_fulfilled === 'true'`)
 * 3. Supabase `pending_purchases` table by `stripe_session_id`
 * 4. Supabase `purchases` table by `stripe_session_id`
 */
export async function isSessionPersistentlyFulfilled(
  sessionId: string,
  sessionMetadata: Record<string, string> | null | undefined,
  supabase: any
): Promise<boolean> {
  if (fulfilledSessionCache.has(sessionId)) {
    return true;
  }

  if (sessionMetadata?.program_fulfilled === 'true' || sessionMetadata?.fulfilled === 'true') {
    fulfilledSessionCache.add(sessionId);
    return true;
  }

  if (supabase) {
    try {
      const { data: pending } = await supabase
        .from('pending_purchases')
        .select('id, stripe_session_id')
        .eq('stripe_session_id', sessionId)
        .maybeSingle();

      if (pending?.id) {
        fulfilledSessionCache.add(sessionId);
        return true;
      }
    } catch (err) {
      console.warn('[Stripe Webhook] Notice checking pending_purchases for duplicate session:', err);
    }

    try {
      const { data: purchase } = await supabase
        .from('purchases')
        .select('id, stripe_session_id')
        .eq('stripe_session_id', sessionId)
        .maybeSingle();

      if (purchase?.id) {
        fulfilledSessionCache.add(sessionId);
        return true;
      }
    } catch (err) {
      // purchases table may have RLS notice if service role key is absent; continue gracefully
    }
  }

  return false;
}

export interface ProcessCheckoutSessionParams {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
  supabase: any;
  sendWelcomeEmailFn?: (args: { email: string; name: string; tier: ProgramTier }) => Promise<boolean>;
  sendAdminSaleNotificationEmailFn?: (args: { customerName: string; customerEmail: string; amount: string; tier: ProgramTier; stripeSessionId?: string }) => Promise<boolean>;
  triggerZapierWebhookFn?: (url: string, payload: any) => Promise<boolean>;
}

export interface ProcessCheckoutSessionResult {
  status: 'fulfilled' | 'ignored_not_paid' | 'ignored_non_program' | 'duplicate_skipped';
  reason?: string;
  tier?: ProgramTier;
  sessionId: string;
  customerEmail?: string;
  priceIds?: string[];
}

/**
 * Processes a completed checkout session:
 * 1. Verifies payment (`payment_status === 'paid'`)
 * 2. Checks duplicate fulfillment persistently by `session.id`
 * 3. Retrieves complete line items from Stripe
 * 4. Identifies program tier using verified live price IDs only
 * 5. Fulfills program access, updates persistent records, sends welcome & admin alert
 */
export async function processCheckoutSessionCompleted({
  session,
  stripe,
  supabase,
  sendWelcomeEmailFn,
  sendAdminSaleNotificationEmailFn,
  triggerZapierWebhookFn,
}: ProcessCheckoutSessionParams): Promise<ProcessCheckoutSessionResult> {
  const sessionId = session.id;
  const customerEmail = (session.customer_details?.email || session.customer_email || '').toLowerCase().trim();
  const customerName = session.customer_details?.name || 'Valued Member';
  const amountTotal = session.amount_total || 0;
  const currency = session.currency || 'usd';

  // 1. Verify payment status
  if (session.payment_status !== 'paid') {
    console.log(`[Stripe Webhook] Session ${sessionId} payment_status is '${session.payment_status}' (not 'paid'). Ignoring.`);
    return {
      status: 'ignored_not_paid',
      reason: `payment_status is '${session.payment_status}'`,
      sessionId,
      customerEmail,
    };
  }

  // 2. Check if already fulfilled persistently (duplicate-safe)
  const isDuplicate = await isSessionPersistentlyFulfilled(sessionId, session.metadata, supabase);
  if (isDuplicate) {
    console.log(`[Stripe Webhook] Session ${sessionId} already fulfilled. Skipping duplicate processing.`);
    return {
      status: 'duplicate_skipped',
      reason: 'Session already fulfilled',
      sessionId,
      customerEmail,
    };
  }

  // 3. Retrieve complete line items from Stripe
  const priceIds = await retrieveSessionLineItemPriceIds(stripe, sessionId);

  // 4. Determine program tier strictly from approved price IDs (no amount inference or fallback)
  const tier = getProgramTierFromPriceIds(priceIds);

  if (!tier) {
    console.log(`[Stripe Webhook] Session ${sessionId} does not contain an approved program price (prices: ${priceIds.join(', ')}). Acknowledging without program access.`);
    return {
      status: 'ignored_non_program',
      reason: 'No approved program price ID found in checkout line items',
      sessionId,
      customerEmail,
      priceIds,
    };
  }

  // 5. Mark as fulfilled in memory immediately to prevent concurrent race conditions
  markSessionCachedAsFulfilled(sessionId);

  // 6. Update Stripe session metadata to persist fulfillment marker
  try {
    await stripe.checkout.sessions.update(sessionId, {
      metadata: {
        ...(session.metadata || {}),
        program_fulfilled: 'true',
        program_tier: tier,
        fulfilled_at: new Date().toISOString(),
      },
    });
  } catch (metaErr) {
    console.warn('[Stripe Webhook] Notice updating session metadata in Stripe:', metaErr);
  }

  // 7. Persist program access in Supabase
  if (customerEmail && supabase) {
    // 7a. Save into pending_purchases (unlocks user upon registration)
    try {
      await supabase
        .from('pending_purchases')
        .upsert({
          email: customerEmail,
          tier,
          stripe_session_id: sessionId,
        }, { onConflict: 'email' });
      console.log(`[Stripe Webhook] Stored in pending_purchases: ${customerEmail} (${tier} tier)`);
    } catch (pendingErr) {
      console.error('[Stripe Webhook] Error saving pending purchase:', pendingErr);
    }

    // 7b. Log into financial ledger (purchases table)
    try {
      await supabase
        .from('purchases')
        .upsert({
          email: customerEmail,
          tier,
          amount_cents: amountTotal,
          currency,
          stripe_session_id: sessionId,
          status: 'completed',
        }, { onConflict: 'stripe_session_id' });
    } catch (ledgerErr) {
      console.warn('[Stripe Webhook] Purchases ledger notice:', ledgerErr);
    }

    // 7c. Activate existing profile if user already signed up
    try {
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', customerEmail)
        .maybeSingle();

      if (existingUser?.id) {
        await supabase
          .from('profiles')
          .update({
            has_paid: true,
            tier,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingUser.id);
        console.log(`[Stripe Webhook] Activated existing user account: ${existingUser.id}`);
      }
    } catch (profileErr) {
      console.warn('[Stripe Webhook] Profile update notice:', profileErr);
    }

    // 7d. Mark quiz lead as converted
    try {
      await supabase
        .from('quiz_leads')
        .update({ converted_to_paid: true })
        .eq('email', customerEmail);
    } catch (leadErr) {
      console.warn('[Stripe Webhook] Quiz lead notice:', leadErr);
    }
  }

  // 8. Send Welcome Email to customer
  if (customerEmail && sendWelcomeEmailFn) {
    try {
      await sendWelcomeEmailFn({
        email: customerEmail,
        name: customerName,
        tier,
      });
      console.log(`[Stripe Webhook] Program welcome email sent to ${customerEmail}`);
    } catch (emailErr) {
      console.error('[Stripe Webhook] Welcome email error:', emailErr);
    }
  }

  // 9. Send Admin Sale Alert to Maria
  if (customerEmail && sendAdminSaleNotificationEmailFn) {
    try {
      await sendAdminSaleNotificationEmailFn({
        customerName,
        customerEmail,
        amount: (amountTotal / 100).toFixed(2),
        tier,
        stripeSessionId: sessionId,
      });
      console.log(`[Stripe Webhook] Admin sale notification sent to Maria for ${customerEmail}`);
    } catch (adminAlertErr) {
      console.error('[Stripe Webhook] Admin alert error:', adminAlertErr);
    }
  }

  // 10. Trigger automated Zapier onboarding webhook (optional CRM/Google Sheets)
  const zapierUrl = process.env.ZAPIER_WEBHOOK_CHECKOUT;
  if (customerEmail && zapierUrl && triggerZapierWebhookFn) {
    try {
      await triggerZapierWebhookFn(zapierUrl, {
        event: 'checkout.session.completed',
        email: customerEmail,
        name: customerName,
        tier,
        amount_total: amountTotal,
        currency,
        session_id: sessionId,
        dashboard_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mane-discovery.vercel.app'}/login?welcome=true`,
        timestamp: new Date().toISOString(),
      });
    } catch (zapErr) {
      console.warn('[Stripe Webhook] Zapier webhook notice:', zapErr);
    }
  }

  return {
    status: 'fulfilled',
    tier,
    sessionId,
    customerEmail,
    priceIds,
  };
}
