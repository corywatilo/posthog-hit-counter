"use client";

import { useState, useEffect } from "react";

interface ApiResponse {
  count?: number;
  demo?: boolean;
  error?: string;
}

export default function DebugPage() {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testUrl, setTestUrl] = useState("http://localhost:8888");
  const [days, setDays] = useState("all");
  const [mounted, setMounted] = useState(false);

  const testApiEndpoint = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        url: testUrl,
        days: days,
      });
      
      const response = await fetch(`/api/pageviews?${params}`);
      const data = await response.json();
      setApiResponse(data);
      
      if (!response.ok) {
        setError(`API returned ${response.status}: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    // Check environment variables (client-side check)
    const envCheck = {
      hasPostHogKey: !!process.env.NEXT_PUBLIC_POSTHOG_KEY_SET,
      currentUrl: window.location.href,
    };
    console.log("Environment check:", envCheck);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">PostHog Hit Counter Debug</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Test API Endpoint</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Test URL</label>
              <input
                type="text"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="http://localhost:8888"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Days</label>
              <select
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="1">1 day</option>
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="all">All time</option>
              </select>
            </div>
            
            <button
              onClick={testApiEndpoint}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Testing..." : "Test API"}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-400 rounded-md">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}
          
          {apiResponse && (
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/20 border border-green-400 rounded-md">
              <p className="text-sm font-medium mb-2">API Response:</p>
              <pre className="text-xs overflow-x-auto">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Status</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Deployment URL:</span>
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {mounted ? window.location.origin : "Loading..."}
              </code>
            </div>
            <div className="flex justify-between">
              <span>API Endpoint:</span>
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                /api/pageviews
              </code>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Embed Test</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            This counter should work if environment variables are set:
          </p>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
            {mounted ? (
              <iframe 
                src={`/widget?style=retro&days=all&url=${encodeURIComponent(window.location.href)}`}
                style={{ border: "none", width: "200px", height: "80px" }}
              />
            ) : (
              <div className="w-[200px] h-[80px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-400 rounded-md">
          <h3 className="font-semibold mb-2">Debugging Steps:</h3>
          <ol className="list-decimal list-inside text-sm space-y-1">
            <li>Make sure you deployed YOUR OWN instance (not using posthog-hit-counter.vercel.app)</li>
            <li>Verify environment variables are set in YOUR Vercel deployment</li>
            <li>Check that POSTHOG_PROJECT_ID matches your project</li>
            <li>Test the API endpoint above with your localhost URL</li>
            <li>Check browser console for any errors</li>
            <li>Verify PostHog is tracking pageviews for localhost:8888</li>
          </ol>
        </div>
      </div>
    </div>
  );
}