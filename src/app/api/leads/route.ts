import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { triggerZapierWebhook } from '@/lib/zapier';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, archetype, tensionScore, easeScore, dominantState, answers } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Record lead into Supabase
    const { data, error } = await supabaseAdmin
      .from('quiz_leads')
      .insert([
        {
          email: cleanEmail,
          name: name ? name.trim() : null,
          archetype: archetype || 'The Undifferentiated Traveler',
          tension_score: tensionScore ?? 0,
          ease_score: easeScore ?? 0,
          dominant_state: dominantState || 'Sympathetic',
          answers: answers || {},
        },
      ])
      .select();

    if (error) {
      console.warn('Could not save lead to quiz_leads table (may need table migration):', error.message);
    }

    // 2. Trigger Zapier automation for immediate automated welcome / nurture sequence
    const zapierUrl = process.env.ZAPIER_WEBHOOK_LEADS || process.env.ZAPIER_WEBHOOK_CHECKOUT;
    if (zapierUrl) {
      await triggerZapierWebhook(zapierUrl, {
        event: 'quiz.completed',
        email: cleanEmail,
        name: name || 'Friend',
        archetype,
        dominant_state: dominantState,
        tension_score: tensionScore,
        ease_score: easeScore,
        source: 'somatic_diagnostic_quiz',
        submitted_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Lead registered successfully',
      leadId: data?.[0]?.id || null,
    });
  } catch (error: any) {
    console.error('Lead capture error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
