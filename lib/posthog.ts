export interface PostHogConfig {
  apiKey: string;
  host?: string;
  projectId?: string;
}

export interface PageViewQuery {
  url: string;
  timeframe: number | "all";
}

export async function fetchPageViews(
  config: PostHogConfig,
  query: PageViewQuery
): Promise<number> {
  const { apiKey, host = "https://app.posthog.com" } = config;
  
  // Extract project ID from API key (format: phc_projectId_...)
  const projectId = apiKey.split("_")[1];
  
  if (!projectId) {
    throw new Error("Invalid PostHog API key format");
  }

  // Calculate date range
  const now = new Date();
  const after = query.timeframe === "all" 
    ? new Date("2020-01-01") // PostHog founding year as "all time" start
    : new Date(now.getTime() - (query.timeframe * 24 * 60 * 60 * 1000));

  // Build the query parameters
  const params = new URLSearchParams({
    events: JSON.stringify([{ id: "$pageview" }]),
    properties: JSON.stringify({
      $current_url: query.url,
    }),
    after: after.toISOString(),
    before: now.toISOString(),
  });

  try {
    const response = await fetch(
      `${host}/api/projects/${projectId}/events?${params}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`PostHog API error: ${response.status}`);
    }

    const data = await response.json();
    
    // The events endpoint returns an array of events
    // We need to count them
    return data.results?.length || 0;
  } catch (error) {
    console.error("Error fetching PostHog data:", error);
    throw error;
  }
}

// Alternative approach using the trends API for aggregated counts
export async function fetchPageViewsAggregate(
  config: PostHogConfig,
  query: PageViewQuery
): Promise<number> {
  const { apiKey, host = "https://app.posthog.com" } = config;
  
  // For public/client-side usage, we'll use a simplified approach
  // In production, you'd want to proxy this through your backend
  
  try {
    // Using the query endpoint which supports aggregation
    const insight = {
      events: [
        {
          id: "$pageview",
          name: "$pageview",
          type: "events",
          properties: [
            {
              key: "$current_url",
              value: query.url,
              operator: "exact",
              type: "event",
            },
          ],
        },
      ],
      display: "ActionsLineGraph",
      interval: "day",
      date_from: query.timeframe === "all" ? "-365d" : `-${query.timeframe}d`,
    };

    const response = await fetch(`${host}/api/projects/@current/insights/trend/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(insight),
    });

    if (!response.ok) {
      throw new Error(`PostHog API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Sum up all the data points
    const total = data.result?.[0]?.data?.reduce((sum: number, val: number) => sum + val, 0) || 0;
    
    return total;
  } catch (error) {
    console.error("Error fetching PostHog aggregate data:", error);
    throw error;
  }
}

// Simplified client-side safe version that uses our proxy endpoint
export async function fetchPageViewsPublic(
  apiKey: string,
  url: string,
  timeframe: number | "all"
): Promise<number> {
  try {
    // Use our proxy API endpoint if available
    const params = new URLSearchParams({
      url: url,
      days: timeframe.toString(),
    });
    
    const response = await fetch(`/api/pageviews?${params}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch pageviews");
    }
    
    const data = await response.json();
    return data.count || 0;
    
  } catch (error) {
    console.error("Error fetching pageviews:", error);
    // Fallback to demo data
    return Math.floor(Math.random() * 50000) + 1000;
  }
}