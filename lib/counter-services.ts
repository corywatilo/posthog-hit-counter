// Alternative counter services that support client-side usage

// 1. Counterscale (Open source, self-hostable)
export async function fetchCounterscale(siteId: string, url: string): Promise<number> {
  try {
    const response = await fetch(`https://your-counterscale.com/api/public/count?site=${siteId}&page=${url}`);
    const data = await response.json();
    return data.count || 0;
  } catch {
    return 0;
  }
}

// 2. GoatCounter (Privacy-friendly, has public API)
export async function fetchGoatCounter(siteCode: string, path: string): Promise<number> {
  try {
    // GoatCounter provides public stats at:
    const response = await fetch(`https://${siteCode}.goatcounter.com/api/v0/stats/total?path=${path}`);
    const data = await response.json();
    return data.count || 0;
  } catch {
    return 0;
  }
}

// 3. Simple Analytics (Has public API option)
export async function fetchSimpleAnalytics(siteId: string, url: string): Promise<number> {
  try {
    // Simple Analytics can expose public endpoints
    const response = await fetch(`https://simpleanalytics.com/api/public/pageviews?site=${siteId}&page=${url}`);
    const data = await response.json();
    return data.pageviews || 0;
  } catch {
    return 0;
  }
}

// 4. Custom PostHog Integration with Webhooks
// Users could set up a PostHog webhook to push counts to a public endpoint
export async function fetchPostHogWebhook(webhookUrl: string): Promise<number> {
  try {
    const response = await fetch(webhookUrl);
    const data = await response.json();
    return data.count || 0;
  } catch {
    return 0;
  }
}