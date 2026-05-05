/**
 * Utility for triggering Zapier Webhooks.
 * 
 * To use this, create a "Catch Hook" trigger in Zapier,
 * copy the provided webhook URL, and store it in your .env.local file.
 */

export async function triggerZapierWebhook(webhookUrl: string | undefined, payload: Record<string, any>) {
  if (!webhookUrl) {
    console.warn('Zapier webhook URL is not defined. Skipping trigger.');
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Zapier webhook returned status ${response.status}:`, await response.text());
      return false;
    }

    console.log(`Successfully triggered Zapier webhook for event:`, payload.event);
    return true;
  } catch (error) {
    console.error('Failed to trigger Zapier webhook:', error);
    return false;
  }
}
