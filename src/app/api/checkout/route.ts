import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key from the environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-02-25.clover',
});

// Map the tiers from the landing page to Stripe Price IDs
const PRICES = {
  basic: process.env.STRIPE_PRICE_BASIC || 'price_basic_placeholder',
  premium: process.env.STRIPE_PRICE_PREMIUM || 'price_premium_placeholder',
};

export async function POST(req: Request) {
  try {
    const { tier } = await req.json();

    const priceId = PRICES[tier as keyof typeof PRICES];

    if (!priceId) {
      return NextResponse.json({ error: 'Invalid or missing tier selected' }, { status: 400 });
    }

    // Fetch the price object to determine if it's one-time or recurring
    const price = await stripe.prices.retrieve(priceId);
    
    // Determine the base URL for success/cancel redirects
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3010';

    // Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: price.type === 'recurring' ? 'subscription' : 'payment',
      // Send the user to the login/signup page after successful payment
      success_url: `${baseUrl}/login?payment_success=true`,
      // Return them to the landing page if they cancel
      cancel_url: `${baseUrl}/#pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Checkout Error API Key:', process.env.STRIPE_SECRET_KEY?.substring(0, 10) + '...');
    console.error('Stripe Checkout Full Error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session. Please verify your Stripe API keys are configured correctly in the backend.' }, { status: 500 });
  }
}
