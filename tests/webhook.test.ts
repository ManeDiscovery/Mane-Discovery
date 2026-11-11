import test from 'node:test';
import assert from 'node:assert';
import {
  PROGRAM_PRICE_BASIC,
  PROGRAM_PRICE_PREMIUM,
  IN_PERSON_PRICE_135,
  getProgramTierFromPriceIds,
  processCheckoutSessionCompleted,
  clearSessionCacheForTesting,
  isSessionPersistentlyFulfilled,
} from '../src/lib/stripeProgram.ts';

// Helper to create a mock Stripe instance with line items
function createMockStripe(lineItemPriceIds: string[]) {
  const updatedMetadata: Record<string, any> = {};

  return {
    checkout: {
      sessions: {
        listLineItems: async (sessionId: string) => {
          return {
            data: lineItemPriceIds.map((priceId, idx) => ({
              id: `li_${idx + 1}`,
              price: { id: priceId },
            })),
            has_more: false,
          };
        },
        update: async (sessionId: string, params: any) => {
          Object.assign(updatedMetadata, params.metadata);
          return { id: sessionId, metadata: updatedMetadata };
        },
      },
    },
    _getUpdatedMetadata: () => updatedMetadata,
  } as any;
}

// Helper to create a mock Supabase instance tracking database writes
function createMockSupabase(existingSessions: string[] = []) {
  const pendingPurchases: any[] = [];
  const purchases: any[] = [];
  const profileUpdates: any[] = [];
  const quizLeadUpdates: any[] = [];

  const existingSet = new Set(existingSessions);

  return {
    from: (table: string) => {
      if (table === 'pending_purchases') {
        return {
          select: () => ({
            eq: (_field: string, val: string) => ({
              maybeSingle: async () => {
                if (existingSet.has(val)) {
                  return { data: { id: 'pending_123', stripe_session_id: val } };
                }
                const found = pendingPurchases.find(p => p.stripe_session_id === val || p.email === val);
                return { data: found || null };
              },
            }),
          }),
          upsert: async (record: any) => {
            pendingPurchases.push(record);
            existingSet.add(record.stripe_session_id);
            return { error: null };
          },
        };
      }

      if (table === 'purchases') {
        return {
          select: () => ({
            eq: (_field: string, val: string) => ({
              maybeSingle: async () => {
                const found = purchases.find(p => p.stripe_session_id === val);
                return { data: found || null };
              },
            }),
          }),
          upsert: async (record: any) => {
            purchases.push(record);
            return { error: null };
          },
        };
      }

      if (table === 'profiles') {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: null }),
            }),
          }),
          update: (record: any) => ({
            eq: (_field: string, val: string) => {
              profileUpdates.push({ ...record, id: val });
              return Promise.resolve({ error: null });
            },
          }),
        };
      }

      if (table === 'quiz_leads') {
        return {
          update: (record: any) => ({
            eq: (_field: string, val: string) => {
              quizLeadUpdates.push({ ...record, email: val });
              return Promise.resolve({ error: null });
            },
          }),
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    },
    _getPendingPurchases: () => pendingPurchases,
    _getPurchases: () => purchases,
  } as any;
}

// Test Suite
test('Price ID mapping correctly assigns program tiers and ignores in-person sessions', () => {
  assert.strictEqual(getProgramTierFromPriceIds([PROGRAM_PRICE_BASIC]), 'basic');
  assert.strictEqual(getProgramTierFromPriceIds([PROGRAM_PRICE_PREMIUM]), 'premium');
  assert.strictEqual(getProgramTierFromPriceIds([IN_PERSON_PRICE_135]), null);
  assert.strictEqual(getProgramTierFromPriceIds(['unknown_random_price']), null);
  assert.strictEqual(getProgramTierFromPriceIds([]), null);
});

test('Scenario 1: The $135 in-person session creates NO program access and sends NO program emails', async () => {
  clearSessionCacheForTesting();

  const mockStripe = createMockStripe([IN_PERSON_PRICE_135]);
  const mockSupabase = createMockSupabase();

  let welcomeEmailsSent = 0;
  let adminAlertsSent = 0;
  let zapierTriggered = 0;

  const session = {
    id: 'cs_live_inperson_session_135',
    customer_details: { email: 'client@example.com', name: 'Barn Client' },
    amount_total: 13500, // $135.00
    currency: 'usd',
    payment_status: 'paid',
  } as any;

  const result = await processCheckoutSessionCompleted({
    session,
    stripe: mockStripe,
    supabase: mockSupabase,
    sendWelcomeEmailFn: async () => {
      welcomeEmailsSent++;
      return true;
    },
    sendAdminSaleNotificationEmailFn: async () => {
      adminAlertsSent++;
      return true;
    },
    triggerZapierWebhookFn: async () => {
      zapierTriggered++;
      return true;
    },
  });

  // Verify status is ignored_non_program
  assert.strictEqual(result.status, 'ignored_non_program');
  assert.strictEqual(result.tier, undefined);

  // Verify no database provisioning occurred
  assert.strictEqual(mockSupabase._getPendingPurchases().length, 0);
  assert.strictEqual(mockSupabase._getPurchases().length, 0);

  // Verify zero emails were dispatched
  assert.strictEqual(welcomeEmailsSent, 0);
  assert.strictEqual(adminAlertsSent, 0);
  assert.strictEqual(zapierTriggered, 0);
});

test('Scenario 2A: Valid $39 program price gets basic tier, access provisioning, and confirmation emails', async () => {
  clearSessionCacheForTesting();

  const mockStripe = createMockStripe([PROGRAM_PRICE_BASIC]);
  const mockSupabase = createMockSupabase();

  const sentWelcomeEmails: any[] = [];
  const sentAdminAlerts: any[] = [];

  const session = {
    id: 'cs_live_somatic_journey_39',
    customer_details: { email: 'journey_seeker@example.com', name: 'Jane Doe' },
    amount_total: 3900,
    currency: 'usd',
    payment_status: 'paid',
  } as any;

  const result = await processCheckoutSessionCompleted({
    session,
    stripe: mockStripe,
    supabase: mockSupabase,
    sendWelcomeEmailFn: async (args) => {
      sentWelcomeEmails.push(args);
      return true;
    },
    sendAdminSaleNotificationEmailFn: async (args) => {
      sentAdminAlerts.push(args);
      return true;
    },
  });

  // Verify fulfillment status and tier
  assert.strictEqual(result.status, 'fulfilled');
  assert.strictEqual(result.tier, 'basic');

  // Verify pending_purchases recorded
  const pending = mockSupabase._getPendingPurchases();
  assert.strictEqual(pending.length, 1);
  assert.strictEqual(pending[0].email, 'journey_seeker@example.com');
  assert.strictEqual(pending[0].tier, 'basic');
  assert.strictEqual(pending[0].stripe_session_id, 'cs_live_somatic_journey_39');

  // Verify financial ledger
  const purchases = mockSupabase._getPurchases();
  assert.strictEqual(purchases.length, 1);
  assert.strictEqual(purchases[0].amount_cents, 3900);

  // Verify customer welcome email
  assert.strictEqual(sentWelcomeEmails.length, 1);
  assert.strictEqual(sentWelcomeEmails[0].email, 'journey_seeker@example.com');
  assert.strictEqual(sentWelcomeEmails[0].tier, 'basic');

  // Verify admin notification email
  assert.strictEqual(sentAdminAlerts.length, 1);
  assert.strictEqual(sentAdminAlerts[0].customerEmail, 'journey_seeker@example.com');
  assert.strictEqual(sentAdminAlerts[0].tier, 'basic');
  assert.strictEqual(sentAdminAlerts[0].amount, '39.00');
});

test('Scenario 2B: Valid $97 program price gets premium tier, access provisioning, and confirmation emails', async () => {
  clearSessionCacheForTesting();

  const mockStripe = createMockStripe([PROGRAM_PRICE_PREMIUM]);
  const mockSupabase = createMockSupabase();

  const sentWelcomeEmails: any[] = [];
  const sentAdminAlerts: any[] = [];

  const session = {
    id: 'cs_live_cohort_97',
    customer_details: { email: 'cohort_member@example.com', name: 'Mark Smith' },
    amount_total: 9700,
    currency: 'usd',
    payment_status: 'paid',
  } as any;

  const result = await processCheckoutSessionCompleted({
    session,
    stripe: mockStripe,
    supabase: mockSupabase,
    sendWelcomeEmailFn: async (args) => {
      sentWelcomeEmails.push(args);
      return true;
    },
    sendAdminSaleNotificationEmailFn: async (args) => {
      sentAdminAlerts.push(args);
      return true;
    },
  });

  // Verify fulfillment status and tier
  assert.strictEqual(result.status, 'fulfilled');
  assert.strictEqual(result.tier, 'premium');

  // Verify pending_purchases recorded
  const pending = mockSupabase._getPendingPurchases();
  assert.strictEqual(pending.length, 1);
  assert.strictEqual(pending[0].email, 'cohort_member@example.com');
  assert.strictEqual(pending[0].tier, 'premium');
  assert.strictEqual(pending[0].stripe_session_id, 'cs_live_cohort_97');

  // Verify customer welcome email
  assert.strictEqual(sentWelcomeEmails.length, 1);
  assert.strictEqual(sentWelcomeEmails[0].email, 'cohort_member@example.com');
  assert.strictEqual(sentWelcomeEmails[0].tier, 'premium');

  // Verify admin alert
  assert.strictEqual(sentAdminAlerts.length, 1);
  assert.strictEqual(sentAdminAlerts[0].tier, 'premium');
  assert.strictEqual(sentAdminAlerts[0].amount, '97.00');
});

test('Scenario 3A: Unpaid checkout session cannot create enrollment or trigger emails', async () => {
  clearSessionCacheForTesting();

  const mockStripe = createMockStripe([PROGRAM_PRICE_PREMIUM]);
  const mockSupabase = createMockSupabase();

  let welcomeEmails = 0;
  let adminAlerts = 0;

  const session = {
    id: 'cs_live_unpaid_attempt',
    customer_details: { email: 'unpaid@example.com', name: 'Unpaid Customer' },
    amount_total: 9700,
    currency: 'usd',
    payment_status: 'unpaid', // NOT paid
  } as any;

  const result = await processCheckoutSessionCompleted({
    session,
    stripe: mockStripe,
    supabase: mockSupabase,
    sendWelcomeEmailFn: async () => {
      welcomeEmails++;
      return true;
    },
    sendAdminSaleNotificationEmailFn: async () => {
      adminAlerts++;
      return true;
    },
  });

  assert.strictEqual(result.status, 'ignored_not_paid');
  assert.strictEqual(mockSupabase._getPendingPurchases().length, 0);
  assert.strictEqual(welcomeEmails, 0);
  assert.strictEqual(adminAlerts, 0);
});

test('Scenario 3B: Repeated events with same Checkout Session ID do not create duplicate enrollments or emails', async () => {
  clearSessionCacheForTesting();

  const mockStripe = createMockStripe([PROGRAM_PRICE_PREMIUM]);
  const mockSupabase = createMockSupabase();

  let welcomeEmails = 0;
  let adminAlerts = 0;

  const session = {
    id: 'cs_live_duplicate_test',
    customer_details: { email: 'dup@example.com', name: 'Duplicate Test' },
    amount_total: 9700,
    currency: 'usd',
    payment_status: 'paid',
  } as any;

  // First invocation
  const result1 = await processCheckoutSessionCompleted({
    session,
    stripe: mockStripe,
    supabase: mockSupabase,
    sendWelcomeEmailFn: async () => {
      welcomeEmails++;
      return true;
    },
    sendAdminSaleNotificationEmailFn: async () => {
      adminAlerts++;
      return true;
    },
  });

  assert.strictEqual(result1.status, 'fulfilled');
  assert.strictEqual(welcomeEmails, 1);
  assert.strictEqual(adminAlerts, 1);

  // Second invocation (identical session ID replayed)
  const result2 = await processCheckoutSessionCompleted({
    session,
    stripe: mockStripe,
    supabase: mockSupabase,
    sendWelcomeEmailFn: async () => {
      welcomeEmails++;
      return true;
    },
    sendAdminSaleNotificationEmailFn: async () => {
      adminAlerts++;
      return true;
    },
  });

  assert.strictEqual(result2.status, 'duplicate_skipped');
  // Welcome and admin alerts should NOT have fired again
  assert.strictEqual(welcomeEmails, 1);
  assert.strictEqual(adminAlerts, 1);
});

test('Scenario 3C: Persistent deduplication via Supabase pending_purchases survives process cache clear', async () => {
  clearSessionCacheForTesting();

  const alreadyFulfilledSessionId = 'cs_live_previously_fulfilled_in_db';
  const mockStripe = createMockStripe([PROGRAM_PRICE_BASIC]);
  const mockSupabase = createMockSupabase([alreadyFulfilledSessionId]);

  let welcomeEmails = 0;

  const session = {
    id: alreadyFulfilledSessionId,
    customer_details: { email: 'persisted@example.com', name: 'Persisted Member' },
    amount_total: 3900,
    currency: 'usd',
    payment_status: 'paid',
  } as any;

  const isFulfilled = await isSessionPersistentlyFulfilled(alreadyFulfilledSessionId, session.metadata, mockSupabase);
  assert.strictEqual(isFulfilled, true);

  const result = await processCheckoutSessionCompleted({
    session,
    stripe: mockStripe,
    supabase: mockSupabase,
    sendWelcomeEmailFn: async () => {
      welcomeEmails++;
      return true;
    },
  });

  assert.strictEqual(result.status, 'duplicate_skipped');
  assert.strictEqual(welcomeEmails, 0);
});

test('Scenario 3D: Persistent deduplication via Stripe session metadata is recognized', async () => {
  clearSessionCacheForTesting();

  const sessionId = 'cs_live_stripe_meta_flagged';
  const mockStripe = createMockStripe([PROGRAM_PRICE_BASIC]);
  const mockSupabase = createMockSupabase();

  let welcomeEmails = 0;

  const session = {
    id: sessionId,
    customer_details: { email: 'metaflag@example.com', name: 'Meta Flag' },
    amount_total: 3900,
    currency: 'usd',
    payment_status: 'paid',
    metadata: {
      program_fulfilled: 'true',
    },
  } as any;

  const result = await processCheckoutSessionCompleted({
    session,
    stripe: mockStripe,
    supabase: mockSupabase,
    sendWelcomeEmailFn: async () => {
      welcomeEmails++;
      return true;
    },
  });

  assert.strictEqual(result.status, 'duplicate_skipped');
  assert.strictEqual(welcomeEmails, 0);
});

test('Scenario 4: High amount non-program purchase does NOT fall back to Guided Embodiment Cohort', async () => {
  clearSessionCacheForTesting();

  // An arbitrary large purchase (e.g. $250 or $500 workshop)
  const mockStripe = createMockStripe(['price_random_large_retreat_250']);
  const mockSupabase = createMockSupabase();

  let welcomeEmails = 0;

  const session = {
    id: 'cs_live_large_retreat_sale',
    customer_details: { email: 'retreat_guest@example.com', name: 'Retreat Guest' },
    amount_total: 25000, // $250.00
    currency: 'usd',
    payment_status: 'paid',
  } as any;

  const result = await processCheckoutSessionCompleted({
    session,
    stripe: mockStripe,
    supabase: mockSupabase,
    sendWelcomeEmailFn: async () => {
      welcomeEmails++;
      return true;
    },
  });

  assert.strictEqual(result.status, 'ignored_non_program');
  assert.strictEqual(result.tier, undefined);
  assert.strictEqual(welcomeEmails, 0);
  assert.strictEqual(mockSupabase._getPendingPurchases().length, 0);
});
