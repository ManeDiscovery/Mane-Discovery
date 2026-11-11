import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { triggerZapierWebhook } from '@/lib/zapier';
import { sendWelcomeEmail, sendAdminSaleNotificationEmail } from '@/lib/email';
import { processCheckoutSessionCompleted } from '@/lib/stripeProgram';

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
    const isRealSecret = Boolean(
      endpointSecret && 
      !endpointSecret.includes('placeholder') && 
      !endpointSecret.includes('...') && 
      endpointSecret.startsWith('whsec_') && 
      endpointSecret.length > 20
    );

    if (isRealSecret) {
      if (!sig) {
        console.error('[Stripe Webhook] Missing stripe-signature header while endpoint secret is configured.');
        return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
      }
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } else {
      console.warn('[Stripe Webhook] STRIPE_WEBHOOK_SECRET is not configured. Parsing payload directly.');
      event = JSON.parse(payload) as Stripe.Event;
    }
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle Checkout Session completed events
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const result = await processCheckoutSessionCompleted({
      session,
      stripe,
      supabase: supabaseAdmin,
      sendWelcomeEmailFn: sendWelcomeEmail,
      sendAdminSaleNotificationEmailFn: sendAdminSaleNotificationEmail,
      triggerZapierWebhookFn: triggerZapierWebhook,
    });

    return NextResponse.json({ received: true, ...result }, { status: 200 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
