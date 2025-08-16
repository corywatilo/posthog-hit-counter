import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");
  const days = searchParams.get("days") || "all";
  
  if (!url) {
    return NextResponse.json({ error: "URL parameter required" }, { status: 400 });
  }

  // Use server-side API key (set in environment variables)
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  
  if (!apiKey) {
    console.error("POSTHOG_PERSONAL_API_KEY not configured");
    // Return demo data if not configured
    return NextResponse.json({ 
      count: Math.floor(Math.random() * 50000) + 1000,
      demo: true 
    });
  }

  try {
    // Calculate date range
    const now = new Date();
    const after = days === "all" 
      ? new Date("2020-01-01")
      : new Date(now.getTime() - (parseInt(days) * 24 * 60 * 60 * 1000));

    // Call PostHog API
    const projectId = process.env.POSTHOG_PROJECT_ID || "1"; // Set your project ID
    const host = process.env.POSTHOG_HOST || "https://app.posthog.com";
    
    const params = new URLSearchParams({
      events: JSON.stringify([{ id: "$pageview" }]),
      properties: JSON.stringify({
        $current_url: url,
      }),
      after: after.toISOString(),
      before: now.toISOString(),
    });

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
    
    return NextResponse.json({ 
      count: data.results?.length || 0,
      demo: false 
    });
    
  } catch (error) {
    console.error("Error fetching PostHog data:", error);
    return NextResponse.json({ 
      error: "Failed to fetch data",
      demo: true,
      count: Math.floor(Math.random() * 50000) + 1000
    }, { status: 500 });
  }
}