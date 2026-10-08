import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email, name, tier = 'basic' } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name || 'Friend';
    const cleanTier: 'basic' | 'premium' = tier === 'premium' ? 'premium' : 'basic';

    const sent = await sendWelcomeEmail({
      email: cleanEmail,
      name: cleanName,
      tier: cleanTier,
    });

    if (sent) {
      return NextResponse.json({
        success: true,
        message: `Welcome email sent successfully to ${cleanEmail}`,
        email: cleanEmail,
        tier: cleanTier,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to send welcome email. Check Resend API logs.',
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Send welcome API error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal server error',
    }, { status: 500 });
  }
}
