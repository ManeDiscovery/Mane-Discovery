import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
      apiVersion: '2026-02-25.clover',
    });

    const PRICES = {
      basic: process.env.STRIPE_PRICE_BASIC || 'price_basic_placeholder',
      premium: process.env.STRIPE_PRICE_PREMIUM || 'price_premium_placeholder',
    };

    const { tier } = await req.json();
    const priceId = PRICES[tier as keyof typeof PRICES];

    if (!priceId || priceId.includes('placeholder')) {
      return NextResponse.json({ error: `Invalid or missing price ID for tier: ${tier}` }, { status: 400 });
    }

    // Fetch the price object to determine if it's one-time or recurring
    const price = await stripe.prices.retrieve(priceId);
    
    // Determine the base URL dynamically based on where the app is deployed
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3010';
    const baseUrl = origin;

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
    console.error('Stripe Checkout Full Error:', err);
    return NextResponse.json({ error: `Stripe Error: ${err.message}` }, { status: 500 });
  }
}
