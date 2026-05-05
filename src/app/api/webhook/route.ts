import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';
import { triggerZapierWebhook } from '@/lib/zapier';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-02-25.clover',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful checkouts
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // In a full implementation, you'd extract the customer's email or client_reference_id
    // to mark their record as "paid" in Supabase so they can access the dashboard.
    console.log('Payment successful for session:', session.id);
    console.log('Customer Email:', session.customer_details?.email);
    
    // Example: Update Supabase (Needs a Service Role key for secure backend updates)
    // await supabase.from('users').update({ has_paid: true }).eq('email', session.customer_details?.email);

    // Trigger Zapier Webhook
    if (session.customer_details?.email) {
      await triggerZapierWebhook(process.env.ZAPIER_WEBHOOK_CHECKOUT, {
        event: 'checkout.session.completed',
        email: session.customer_details.email,
        name: session.customer_details.name || 'Customer',
        amount_total: session.amount_total,
        currency: session.currency,
      });
    }
  }

  return NextResponse.json({ received: true });
}
