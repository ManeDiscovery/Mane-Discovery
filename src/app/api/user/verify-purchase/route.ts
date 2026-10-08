import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();
    if (!email) {
      return NextResponse.json({ verified: false, error: 'Email required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Check pending_purchases table first
    try {
      const { data: pending } = await supabaseAdmin
        .from('pending_purchases')
        .select('*')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (pending) {
        const tier = (pending.tier as 'basic' | 'premium') || 'basic';
        return NextResponse.json({
          verified: true,
          tier,
          source: 'pending_purchases',
        });
      }
    } catch (e) {
      console.warn('[VerifyPurchase] Pending purchases check error:', e);
    }

    // 2. Fallback: Query Stripe API directly for completed checkout sessions
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (stripeSecretKey && !stripeSecretKey.includes('placeholder')) {
      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2026-02-25.clover',
      });

      const sessions = await stripe.checkout.sessions.list({
        limit: 30,
      });

      const matchedSession = sessions.data.find((s) => {
        const sEmail = (s.customer_details?.email || s.customer_email || '').toLowerCase().trim();
        const isPaid = s.payment_status === 'paid' || s.status === 'complete';
        return sEmail === cleanEmail && isPaid;
      });

      if (matchedSession) {
        const amount = matchedSession.amount_total || 0;
        const tier: 'basic' | 'premium' = 
          (amount >= 8000 || matchedSession.metadata?.tier === 'premium') ? 'premium' : 'basic';

        // Auto-save into pending_purchases so database is synced
        try {
          await supabaseAdmin.from('pending_purchases').upsert({
            email: cleanEmail,
            tier,
            stripe_session_id: matchedSession.id,
          }, { onConflict: 'email' });
        } catch (e) {
          console.warn('[VerifyPurchase] Upsert pending purchase error:', e);
        }

        // Fire welcome email if customer is signing up
        try {
          await sendWelcomeEmail({
            email: cleanEmail,
            name: name || matchedSession.customer_details?.name || 'Valued Member',
            tier,
          });
        } catch (e) {
          console.warn('[VerifyPurchase] Welcome email trigger error:', e);
        }

        return NextResponse.json({
          verified: true,
          tier,
          source: 'stripe_direct',
          sessionId: matchedSession.id,
        });
      }
    }

    return NextResponse.json({
      verified: false,
      message: 'No completed purchase found for this email address.',
    });
  } catch (error: any) {
    console.error('Verify purchase error:', error);
    return NextResponse.json({
      verified: false,
      error: error.message || 'Internal server error',
    }, { status: 500 });
  }
}
