import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { dailyLessons } from '@/data/lessons';
import { triggerZapierWebhook } from '@/lib/zapier';
import { sendDailyReminderEmail } from '@/lib/email';

export async function GET(req: Request) {
  // Check authorization token for secure cron execution (optional: Bearer secret)
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // If a CRON_SECRET is configured, enforce authorization
    return NextResponse.json({ error: 'Unauthorized cron request' }, { status: 401 });
  }

  try {
    // Fetch active users who have paid and are still in progress (day 1 to 21)
    const { data: activeUsers, error } = await supabaseAdmin
      .from('profiles')
      .select('id, email, current_day, tier, has_paid')
      .eq('has_paid', true)
      .lte('current_day', 21);

    if (error) {
      console.error('Failed to fetch active users for daily reminder:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const remindersDispatched = [];

    for (const user of activeUsers || []) {
      if (!user.email) continue;

      const dayNumber = user.current_day || 1;
      const lesson = dailyLessons[dayNumber] || dailyLessons[1];

      // 1. Dispatch Instant Resend Email
      await sendDailyReminderEmail({
        email: user.email,
        day: dayNumber,
        title: lesson.title,
        practiceTitle: lesson.practice.title,
        practiceDuration: lesson.practice.durationMinutes,
        herdInsight: lesson.herdInsight,
      });

      // 2. Dispatch automated daily practice ping to Zapier or webhook worker
      const zapierUrl = process.env.ZAPIER_WEBHOOK_DAILY_REMINDER || process.env.ZAPIER_WEBHOOK_CHECKOUT;
      if (zapierUrl) {
        await triggerZapierWebhook(zapierUrl, {
          event: 'daily_lesson.ready',
          email: user.email,
          current_day: dayNumber,
          lesson_title: lesson.title,
          practice_title: lesson.practice.title,
          practice_duration: lesson.practice.durationMinutes,
          herd_insight: lesson.herdInsight,
          dashboard_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mane-discovery.vercel.app'}/day/${dayNumber}/checkin`,
        });
      }

      remindersDispatched.push({
        email: user.email,
        day: dayNumber,
        title: lesson.title,
      });
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      dispatchedCount: remindersDispatched.length,
      recipients: remindersDispatched,
    });
  } catch (error: any) {
    console.error('Daily reminder cron error:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // Support POST triggers as well
  return GET(req);
}
