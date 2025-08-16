"use client";

import { useState, useEffect } from "react";
import { fetchPageViewsPublic } from "@/lib/posthog";

export type CounterStyle = "retro" | "digital" | "minimal" | "classic" | "neon";
export type Timeframe = number | "all";

interface PostHogHitCounterProps {
  projectApiKey?: string;
  style?: CounterStyle;
  timeframe?: Timeframe;
  className?: string;
  label?: string;
  darkMode?: "auto" | "light" | "dark";
  url?: string; // Optional URL override, defaults to current page
}

export function PostHogHitCounter({
  projectApiKey,
  style = "retro",
  timeframe = "all",
  className = "",
  label = "Visitors",
  darkMode = "auto",
  url,
}: PostHogHitCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        // Get the current page URL or use provided URL
        const pageUrl = url || (typeof window !== "undefined" ? window.location.href : "");
        
        if (!pageUrl) {
          throw new Error("Unable to determine page URL");
        }

        // If no API key provided, use demo mode
        if (!projectApiKey) {
          // Demo mode: show random number
          const demoCount = await fetchPageViewsPublic("demo", pageUrl, timeframe);
          setCount(demoCount);
        } else {
          // Real mode: fetch from PostHog
          const viewCount = await fetchPageViewsPublic(projectApiKey, pageUrl, timeframe);
          setCount(viewCount);
        }
      } catch (err) {
        console.error("Error fetching page views:", err);
        setError(err instanceof Error ? err.message : "Failed to load counter");
        setCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [projectApiKey, timeframe, url]);

  const isDark = darkMode === "dark" || 
    (darkMode === "auto" && typeof window !== "undefined" && 
     window.matchMedia?.("(prefers-color-scheme: dark)").matches);

  if (loading) {
    return <CounterSkeleton style={style} className={className} />;
  }

  if (error) {
    return <CounterError className={className} />;
  }

  const displayCount = count?.toString().padStart(6, "0") || "000000";

  return (
    <div className={`inline-block ${className}`}>
      {style === "retro" && <RetroCounter count={displayCount} label={label} isDark={isDark} />}
      {style === "digital" && <DigitalCounter count={displayCount} label={label} isDark={isDark} />}
      {style === "minimal" && <MinimalCounter count={displayCount} label={label} isDark={isDark} />}
      {style === "classic" && <ClassicCounter count={displayCount} label={label} />}
      {style === "neon" && <NeonCounter count={displayCount} label={label} isDark={isDark} />}
    </div>
  );
}

function CounterSkeleton({ style, className }: { style: CounterStyle; isDark?: boolean; className: string }) {
  return (
    <div className={`inline-block animate-pulse ${className}`}>
      <div className={`
        ${style === "retro" ? "bg-gray-800 rounded px-3 py-2" : ""}
        ${style === "digital" ? "bg-black rounded-lg px-4 py-3" : ""}
        ${style === "minimal" ? "bg-gray-100 rounded px-2 py-1" : ""}
        ${style === "classic" ? "bg-gray-900 rounded-md px-3 py-2" : ""}
        ${style === "neon" ? "bg-gray-900 rounded-xl px-4 py-3" : ""}
      `}>
        <div className="h-6 w-24 bg-gray-600 rounded"></div>
      </div>
    </div>
  );
}

function CounterError({ className }: { style?: CounterStyle; isDark?: boolean; className: string }) {
  return (
    <div className={`inline-block ${className}`}>
      <div className="text-red-500 text-sm">Error loading counter</div>
    </div>
  );
}

function RetroCounter({ count, label, isDark }: { count: string; label: string; isDark: boolean }) {
  return (
    <div className="inline-flex flex-col items-center">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-3 shadow-xl border-2 border-gray-700">
        <div className="flex space-x-1">
          {count.split("").map((digit, i) => (
            <div
              key={i}
              className="bg-black text-green-400 font-mono text-xl w-7 h-9 flex items-center justify-center rounded shadow-inner"
              style={{
                textShadow: "0 0 10px #00ff00",
                fontFamily: "'Courier New', monospace",
              }}
            >
              {digit}
            </div>
          ))}
        </div>
      </div>
      <span className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{label}</span>
    </div>
  );
}

function DigitalCounter({ count, label, isDark }: { count: string; label: string; isDark: boolean }) {
  return (
    <div className="inline-flex flex-col items-center">
      <div className="bg-black rounded-lg px-4 py-3 shadow-2xl border border-gray-800">
        <div 
          className="font-mono text-2xl text-red-500"
          style={{
            fontFamily: "'Digital-7', 'Courier New', monospace",
            letterSpacing: "0.1em",
            textShadow: "0 0 8px rgba(239, 68, 68, 0.8)",
          }}
        >
          {count}
        </div>
      </div>
      <span className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{label}</span>
    </div>
  );
}

function MinimalCounter({ count, label, isDark }: { count: string; label: string; isDark: boolean }) {
  const trimmedCount = parseInt(count).toLocaleString();
  return (
    <div className="inline-flex items-center space-x-2">
      <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{label}:</span>
      <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{trimmedCount}</span>
    </div>
  );
}

function ClassicCounter({ count, label }: { count: string; label: string; isDark?: boolean }) {
  return (
    <div className="inline-flex flex-col items-center">
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-md px-3 py-2 shadow-md border border-gray-300">
        <div className="flex space-x-0.5">
          {count.split("").map((digit, i) => (
            <div
              key={i}
              className="bg-white text-gray-800 font-bold text-lg w-6 h-8 flex items-center justify-center rounded-sm shadow-sm border border-gray-200"
            >
              {digit}
            </div>
          ))}
        </div>
      </div>
      <span className="text-xs mt-1 text-gray-600">{label}</span>
    </div>
  );
}

function NeonCounter({ count, label, isDark }: { count: string; label: string; isDark: boolean }) {
  return (
    <div className="inline-flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-purple-600 blur-xl opacity-50 rounded-xl"></div>
        <div className="relative bg-gray-900 rounded-xl px-4 py-3 border-2 border-purple-500">
          <div 
            className="font-mono text-2xl text-purple-300"
            style={{
              textShadow: "0 0 20px rgba(168, 85, 247, 0.9), 0 0 40px rgba(168, 85, 247, 0.5)",
              letterSpacing: "0.15em",
            }}
          >
            {count}
          </div>
        </div>
      </div>
      <span className={`text-xs mt-2 ${isDark ? "text-purple-300" : "text-purple-600"}`}>{label}</span>
    </div>
  );
}