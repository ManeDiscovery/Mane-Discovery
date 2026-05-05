import { NextResponse } from 'next/server';
import { triggerZapierWebhook } from '@/lib/zapier';

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Trigger Zapier Webhook
    const success = await triggerZapierWebhook(process.env.ZAPIER_WEBHOOK_COMPLETION, {
      event: 'journey.completed',
      email,
      name,
      completed_at: new Date().toISOString(),
    });

    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('Completion webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
