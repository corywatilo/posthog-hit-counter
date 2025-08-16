import { PostHogHitCounter } from "@/components/PostHogHitCounter";
import { Suspense } from "react";

interface WidgetPageProps {
  searchParams: Promise<{
    key?: string;
    style?: string;
    days?: string;
    label?: string;
    dark?: string;
    url?: string;
  }>;
}

function WidgetContent({ searchParams }: { searchParams: any }) {
  const style = (searchParams.style || "retro") as any;
  const timeframe = searchParams.days === "all" ? "all" : parseInt(searchParams.days || "0") || "all";
  const label = searchParams.label || "Visitors";
  const darkMode = (searchParams.dark || "auto") as any;
  const url = searchParams.url;
  const apiKey = searchParams.key;

  return (
    <PostHogHitCounter
      projectApiKey={apiKey}
      style={style}
      timeframe={timeframe}
      label={label}
      darkMode={darkMode}
      url={url}
    />
  );
}

export default async function WidgetPage({ searchParams }: WidgetPageProps) {
  const params = await searchParams;
  
  return (
    <div className="p-2">
      <Suspense fallback={<div>Loading...</div>}>
        <WidgetContent searchParams={params} />
      </Suspense>
    </div>
  );
}