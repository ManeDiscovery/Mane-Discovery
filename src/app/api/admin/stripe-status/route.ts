import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendWelcomeEmail } from '@/lib/email';

export async function GET(req: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey || stripeSecretKey.includes('placeholder')) {
    return NextResponse.json({
      configured: false,
      error: 'STRIPE_SECRET_KEY is not configured or is a placeholder',
    });
  }

  try {
    const isLive = stripeSecretKey.startsWith('sk_live_');
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2026-02-25.clover',
    });

    // 1. Fetch recent checkout sessions
    const sessions = await stripe.checkout.sessions.list({
      limit: 20,
    });

    // 2. Fetch recent payment intents
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 10,
    });

    const parsedSessions = sessions.data.map((s) => {
      const email = (s.customer_details?.email || s.customer_email || '').toLowerCase().trim();
      const name = s.customer_details?.name || 'Customer';
      const amount = s.amount_total ? (s.amount_total / 100).toFixed(2) : '0.00';
      const isPaid = s.payment_status === 'paid' || s.status === 'complete';
      return {
        id: s.id,
        created: new Date(s.created * 1000).toISOString(),
        email,
        name,
        amount,
        currency: s.currency,
        status: s.status,
        paymentStatus: s.payment_status,
        mode: s.mode,
        isPaid,
      };
    });

    const completedSessions = parsedSessions.filter((s) => s.isPaid && s.email);

    // Auto-reconcile completed sessions into pending_purchases if not present
    const reconciled: string[] = [];
    for (const session of completedSessions) {
      try {
        const { data: existing } = await supabaseAdmin
          .from('pending_purchases')
          .select('email')
          .eq('email', session.email)
          .maybeSingle();

        if (!existing) {
          await supabaseAdmin.from('pending_purchases').upsert({
            email: session.email,
            tier: parseFloat(session.amount) >= 80 ? 'premium' : 'basic',
            stripe_session_id: session.id,
          }, { onConflict: 'email' });
          reconciled.push(session.email);
        }
      } catch (err) {
        console.error('Failed to auto-reconcile session:', session.id, err);
      }
    }

    return NextResponse.json({
      configured: true,
      mode: isLive ? 'live' : 'test',
      keyPrefix: stripeSecretKey.substring(0, 7) + '...',
      totalCheckoutSessions: parsedSessions.length,
      completedOrdersCount: completedSessions.length,
      completedOrders: completedSessions,
      allSessions: parsedSessions,
      recentPaymentIntents: paymentIntents.data.map((p) => ({
        id: p.id,
        amount: (p.amount / 100).toFixed(2),
        currency: p.currency,
        status: p.status,
        created: new Date(p.created * 1000).toISOString(),
        receiptEmail: p.receipt_email,
      })),
      autoReconciled: reconciled,
    });
  } catch (error: any) {
    console.error('Stripe status check error:', error);
    return NextResponse.json({
      configured: true,
      error: error.message || 'Failed to communicate with Stripe API',
    }, { status: 500 });
  }
}
