import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
export const resend = new Resend(resendApiKey);

// Default sender address. Once you verify your domain in Resend, switch to e.g. "Maria Roach <maria@manediscovery.com>"
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || 'Mane Discovery <onboarding@resend.dev>';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mane-discovery.vercel.app';

// Base styling wrapper for luxurious, on-brand emails
function emailWrapper(content: string, previewText: string = ''): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mane Discovery</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2E3B32;">
  ${previewText ? `<div style="display: none; max-height: 0px; overflow: hidden;">${previewText}</div>` : ''}
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FAF8F5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 24px; overflow: hidden; border: 1px solid #E3DDD3; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #2E3B32; padding: 32px 40px; text-align: center;">
              <p style="margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 3px; font-size: 11px; font-weight: 700; color: #FDA4AF;">
                Mane Discovery
              </p>
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 26px; color: #FAF8F5; font-weight: 400; letter-spacing: -0.5px;">
                The 21-Day Nervous System Reset
              </h1>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 40px 40px 32px 40px; font-size: 15px; line-height: 1.7; color: #374151;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F4EFEB; padding: 24px 40px; text-align: center; border-top: 1px solid #E5DFD7; font-size: 12px; color: #6B7280; line-height: 1.6;">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #2E3B32;">Mane Discovery • Equine Somatic Resets</p>
              <p style="margin: 0;">You received this because of your journey with Mane Discovery. Your biological safety always comes first.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// 1. WELCOME EMAIL (Fired on Stripe Checkout)
export async function sendWelcomeEmail({
  email,
  name,
  tier,
}: {
  email: string;
  name: string;
  tier: 'basic' | 'premium';
}) {
  if (!resendApiKey) {
    console.warn('[Resend] RESEND_API_KEY is missing. Skipping email.');
    return false;
  }

  const tierTitle = tier === 'premium' ? 'Guided Embodiment Cohort ($97)' : 'The Solo Reset ($39)';
  const loginUrl = `${SITE_URL}/login?payment_success=true`;

  const html = emailWrapper(`
    <p style="font-size: 17px; color: #2E3B32; font-weight: 600; margin-top: 0;">
      Welcome to your reset, ${name || 'Friend'}.
    </p>
    <p>
      Your payment for <strong>${tierTitle}</strong> was successful. Your access has been automatically provisioned in our system.
    </p>
    <p>
      This is not a challenge where you push through resistance. This is a 21-day somatic sanctuary where you finally learn to work <em>with</em> your biology rather than fighting it.
    </p>

    <!-- Call to action button -->
    <div style="text-align: center; margin: 36px 0;">
      <a href="${loginUrl}" style="background-color: #2E3B32; color: #FAF8F5; padding: 16px 36px; border-radius: 999px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 13px; display: inline-block; box-shadow: 0 4px 12px rgba(46,59,50,0.2);">
        Enter Your Dashboard &rarr;
      </a>
    </div>

    <div style="background-color: #FFF1F2; border: 1px solid #FFE4E6; border-radius: 16px; padding: 20px; margin: 28px 0;">
      <p style="margin: 0; font-size: 13px; color: #881337; line-height: 1.6;">
        <strong>How to begin:</strong> Start with <strong>Day 1: Finding Your Inner Rhythm</strong>. Check in with the interactive ring, read the clinical herd insight, and take 3 minutes for the Soft Gaze exercise.
      </p>
    </div>

    <p style="margin-bottom: 0;">
      With warmth,<br/>
      <strong>Maria Roach</strong><br/>
      <span style="font-size: 13px; color: #6B7280;">Creator, Mane Discovery</span>
    </p>
  `, 'Your access to the 21-Day Nervous System Reset is ready.');

  try {
    const res = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [email],
      subject: '✨ Your 21-Day Nervous System Reset is Ready',
      html,
    });
    console.log('[Resend] Welcome email sent:', res);
    return true;
  } catch (error) {
    console.error('[Resend] Failed to send welcome email:', error);
    return false;
  }
}

// 2. QUIZ REPORT EMAIL (Fired on Diagnostic Quiz Completion)
export async function sendQuizReportEmail({
  email,
  name,
  archetype,
  quote,
  herdWisdom,
  recommendedDay,
}: {
  email: string;
  name: string;
  archetype: string;
  quote?: string;
  herdWisdom?: string;
  recommendedDay?: string;
}) {
  if (!resendApiKey) {
    console.warn('[Resend] RESEND_API_KEY is missing. Skipping email.');
    return false;
  }

  const quizUrl = `${SITE_URL}/quiz`;
  const checkoutUrl = `${SITE_URL}/#pricing`;

  const html = emailWrapper(`
    <p style="font-size: 17px; color: #2E3B32; font-weight: 600; margin-top: 0;">
      Hello ${name || 'there'},
    </p>
    <p>
      Thank you for taking the 60-Second Somatic Diagnostic. Based on your autonomic answers, your primary nervous system profile is:
    </p>

    <!-- Archetype Card -->
    <div style="background-color: #2E3B32; border-radius: 20px; padding: 28px; text-align: center; margin: 28px 0; color: #FAF8F5;">
      <span style="background-color: rgba(253, 164, 175, 0.2); color: #FDA4AF; border: 1px solid rgba(253, 164, 175, 0.4); padding: 4px 12px; border-radius: 999px; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">
        Your Biological Archetype
      </span>
      <h2 style="font-family: Georgia, serif; font-size: 26px; margin: 12px 0 8px 0; color: #FAF8F5;">
        ${archetype}
      </h2>
      ${quote ? `<p style="font-style: italic; color: #FDA4AF; margin: 0; font-size: 14px;">"${quote}"</p>` : ''}
    </div>

    ${herdWisdom ? `
    <div style="background-color: #F5F9F6; border: 1px solid #DCE8DF; border-radius: 16px; padding: 20px; margin: 24px 0;">
      <p style="margin: 0 0 6px 0; font-weight: 700; color: #2E3B32; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
        🐴 The Equine Reset Insight:
      </p>
      <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.6;">
        ${herdWisdom}
      </p>
    </div>
    ` : ''}

    <p>
      Your nervous system isn't broken. It adapted to keep you safe. In <strong>The 21-Day Nervous System Reset</strong>, you will practice the exact micro-exercises to guide your biology back to regulation.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${checkoutUrl}" style="background-color: #2E3B32; color: #FAF8F5; padding: 16px 36px; border-radius: 999px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 13px; display: inline-block;">
        Start Your 21-Day Reset ($39) &rarr;
      </a>
    </div>

    <p style="margin-bottom: 0;">
      Warmly,<br/>
      <strong>Maria Roach</strong>
    </p>
  `, `Your Somatic Blueprint: You are ${archetype}.`);

  try {
    const res = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [email],
      subject: `🌿 Your Somatic Blueprint: ${archetype}`,
      html,
    });
    console.log('[Resend] Quiz report email sent:', res);
    return true;
  } catch (error) {
    console.error('[Resend] Failed to send quiz report email:', error);
    return false;
  }
}

// 3. DAILY PRACTICE REMINDER EMAIL (Fired by Cron)
export async function sendDailyReminderEmail({
  email,
  day,
  title,
  practiceTitle,
  practiceDuration,
  herdInsight,
}: {
  email: string;
  day: number;
  title: string;
  practiceTitle: string;
  practiceDuration: number;
  herdInsight: string;
}) {
  if (!resendApiKey) return false;

  const dayUrl = `${SITE_URL}/day/${day}/checkin`;

  const html = emailWrapper(`
    <p style="font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #E11D48; margin-top: 0;">
      Day ${day} of 21
    </p>
    <h2 style="font-family: Georgia, serif; font-size: 24px; color: #2E3B32; margin: 4px 0 16px 0;">
      ${title}
    </h2>

    <p style="font-size: 15px; color: #4B5563;">
      Today's somatic integration practice is <strong>"${practiceTitle}"</strong> (${practiceDuration} minutes).
    </p>

    <div style="background-color: #F5F9F6; border-left: 4px solid #2E3B32; padding: 16px 20px; margin: 24px 0; border-radius: 0 12px 12px 0;">
      <p style="margin: 0; font-size: 14px; font-style: italic; color: #2E3B32;">
        "${herdInsight}"
      </p>
    </div>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${dayUrl}" style="background-color: #2E3B32; color: #FAF8F5; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; display: inline-block;">
        Begin Day ${day} Practice &rarr;
      </a>
    </div>
  `, `Day ${day}: ${title} is waiting for you in Mane Discovery.`);

  try {
    await resend.emails.send({
      from: DEFAULT_FROM,
      to: [email],
      subject: `🐴 Day ${day}: ${title}`,
      html,
    });
    return true;
  } catch (e) {
    console.error(`[Resend] Failed daily reminder to ${email}:`, e);
    return false;
  }
}

// 4. PRACTITIONER APPLICATION NOTIFICATION (Fired on application submit)
export async function sendPractitionerApplicationEmails({
  email,
  fullName,
  phone,
  experienceLevel,
  motivation,
}: {
  email: string;
  fullName: string;
  phone?: string;
  experienceLevel?: string;
  motivation?: string;
}) {
  if (!resendApiKey) return false;

  // Email to the applicant
  const applicantHtml = emailWrapper(`
    <p style="font-size: 17px; color: #2E3B32; font-weight: 600; margin-top: 0;">
      Thank you for applying, ${fullName}.
    </p>
    <p>
      Your application for the <strong>Somatic EFL Practitioner Pathway</strong> has been received by Maria Roach and our admissions team.
    </p>
    <p>
      We review each application carefully to ensure participants are aligned with somatic herd dynamics and trauma-informed equine ethics.
    </p>
    <div style="background-color: #F5F9F6; border: 1px solid #DCE8DF; border-radius: 16px; padding: 20px; margin: 24px 0;">
      <p style="margin: 0; font-size: 14px; color: #2E3B32; font-weight: 600;">Next Steps:</p>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #4B5563;">
        We will review your dossier within 24 to 48 hours and send you a link to book your 20-minute preliminary interview.
      </p>
    </div>
    <p>
      Warmly,<br/>
      <strong>Maria Roach</strong><br/>
      <span style="font-size: 13px; color: #6B7280;">Founder & Lead Facilitator, Mane Discovery</span>
    </p>
  `, 'Your Somatic EFL Practitioner Application has been received.');

  // Notification email to Maria
  const adminHtml = emailWrapper(`
    <h2 style="font-family: Georgia, serif; font-size: 22px; color: #2E3B32; margin-top: 0;">
      🐴 New Practitioner Application Received
    </h2>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Applicant:</td><td>${fullName}</td></tr>
      <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td>${email}</td></tr>
      <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td>${phone || 'N/A'}</td></tr>
      <tr><td style="padding: 6px 0; font-weight: bold;">Background:</td><td>${experienceLevel || 'Not specified'}</td></tr>
    </table>
    <div style="background-color: #FAF8F5; border: 1px solid #E5DFD7; border-radius: 12px; padding: 16px; margin-top: 20px;">
      <p style="margin: 0 0 4px 0; font-weight: bold; font-size: 12px; text-transform: uppercase; color: #6B7280;">Motivation:</p>
      <p style="margin: 0; font-style: italic; color: #374151;">"${motivation}"</p>
    </div>
  `);

  try {
    // Send to applicant
    await resend.emails.send({
      from: DEFAULT_FROM,
      to: [email],
      subject: '🐴 Your Somatic EFL Practitioner Application Received',
      html: applicantHtml,
    });

    // Send alert to admin / Maria
    const adminEmail = process.env.ADMIN_ALERT_EMAIL || 'info@manediscovery.com';
    await resend.emails.send({
      from: DEFAULT_FROM,
      to: [adminEmail],
      subject: `🔔 New Practitioner Application: ${fullName}`,
      html: adminHtml,
    });

    return true;
  } catch (e) {
    console.error('[Resend] Practitioner emails error:', e);
    return false;
  }
}
