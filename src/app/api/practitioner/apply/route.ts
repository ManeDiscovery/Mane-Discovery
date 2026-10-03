import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { triggerZapierWebhook } from '@/lib/zapier';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, experienceLevel, motivation } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = (fullName || 'Prospective Practitioner').trim();

    // 1. Record application in Supabase
    const { data, error } = await supabaseAdmin
      .from('practitioner_applications')
      .insert([
        {
          full_name: cleanName,
          email: cleanEmail,
          phone: phone ? phone.trim() : null,
          experience_level: experienceLevel || 'Aspiring Facilitator',
          motivation: motivation ? motivation.trim() : 'Expressed interest via waitlist',
          status: 'pending',
        },
      ])
      .select();

    if (error) {
      console.warn('Could not save to practitioner_applications table:', error.message);
    }

    // 2. Trigger automated Zapier notification
    const zapierUrl = process.env.ZAPIER_WEBHOOK_PRACTITIONER || process.env.ZAPIER_WEBHOOK_CHECKOUT;
    if (zapierUrl) {
      await triggerZapierWebhook(zapierUrl, {
        event: 'practitioner.application_submitted',
        email: cleanEmail,
        name: cleanName,
        phone: phone || 'N/A',
        experience: experienceLevel || 'Not specified',
        motivation: motivation || 'Interest list',
        submitted_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Application received. Maria and the team will review your dossier within 24 hours.',
      applicationId: data?.[0]?.id || null,
    });
  } catch (error: any) {
    console.error('Practitioner application error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
