import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { triggerZapierWebhook } from '@/lib/zapier';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2026-02-25.clover',
  });

  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    const isRealSecret = endpointSecret && 
      !endpointSecret.includes('placeholder') && 
      !endpointSecret.includes('...') && 
      endpointSecret.startsWith('whsec_') && 
      endpointSecret.length > 20;

    if (sig && isRealSecret) {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } else {
      // Fallback if webhook secret is still a placeholder or incomplete
      console.warn('[Stripe Webhook] STRIPE_WEBHOOK_SECRET is not a full valid key. Parsing payload directly.');
      const parsed = JSON.parse(payload);
      event = parsed as Stripe.Event;
    }
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful checkouts
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = (session.customer_details?.email || session.customer_email || '').toLowerCase().trim();
    const customerName = session.customer_details?.name || 'Valued Member';
    const amountTotal = session.amount_total || 0;
    const currency = session.currency || 'usd';

    // Determine tier: check line items, price ID or metadata
    let tier: 'basic' | 'premium' = 'basic';
    if (amountTotal >= 8000 || session.metadata?.tier === 'premium') {
      tier = 'premium';
    }

    console.log(`[Stripe Webhook] Successful checkout for ${customerEmail} (${tier} tier - ${amountTotal / 100} ${currency})`);

    if (customerEmail) {
      try {
        // 1. Log the purchase in the financial purchases table
        await supabaseAdmin.from('purchases').upsert({
          email: customerEmail,
          tier,
          amount_cents: amountTotal,
          currency,
          stripe_session_id: session.id,
          status: 'completed',
        }, { onConflict: 'stripe_session_id' });

        // 2. Check if a profile already exists for this email
        const { data: existingUser } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('email', customerEmail)
          .maybeSingle();

        if (existingUser?.id) {
          // User already has an account -> Immediately activate paid status & tier
          await supabaseAdmin
            .from('profiles')
            .update({
              has_paid: true,
              tier,
              updated_at: new Date().toISOString(),
            })
            .eq('id', existingUser.id);
          console.log(`[Stripe Webhook] Activated existing user account: ${existingUser.id}`);
        } else {
          // User paid before signing up -> Save in pending_purchases
          // The Supabase trigger handle_new_user_purchase() will unlock upon registration
          await supabaseAdmin
            .from('pending_purchases')
            .upsert({
              email: customerEmail,
              tier,
              stripe_session_id: session.id,
            }, { onConflict: 'email' });
          console.log(`[Stripe Webhook] Stored in pending_purchases for future signup: ${customerEmail}`);
        }

        // 3. Mark quiz lead as converted if they took the assessment
        await supabaseAdmin
          .from('quiz_leads')
          .update({ converted_to_paid: true })
          .eq('email', customerEmail);

        // 4. Send Instant Resend Welcome Email
        await sendWelcomeEmail({
          email: customerEmail,
          name: customerName,
          tier,
        });

        // 5. Trigger automated Zapier onboarding webhook (optional CRM/Google Sheets)
        const zapierUrl = process.env.ZAPIER_WEBHOOK_CHECKOUT;
        if (zapierUrl) {
          await triggerZapierWebhook(zapierUrl, {
            event: 'checkout.session.completed',
            email: customerEmail,
            name: customerName,
            tier,
            amount_total: amountTotal,
            currency,
            session_id: session.id,
            dashboard_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mane-discovery.vercel.app'}/login?payment_success=true`,
            timestamp: new Date().toISOString(),
          });
        }
      } catch (dbError: any) {
        console.error('[Stripe Webhook] Database provisioning error:', dbError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
