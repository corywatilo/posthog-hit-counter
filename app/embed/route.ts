import { NextResponse } from "next/server";

// This endpoint serves the embeddable JavaScript
export async function GET() {
  const embedScript = `
(function() {
  console.log('PostHog Hit Counter: Initializing...');
  
  // Find all script tags with our embed script
  const scripts = document.querySelectorAll('script[src*="/embed"]');
  console.log('PostHog Hit Counter: Found', scripts.length, 'script tags');
  
  scripts.forEach(function(script, index) {
    console.log('PostHog Hit Counter: Processing script', index, script.src);
    // data-key is optional - if not provided, server will use its own env vars
    const apiKey = script.getAttribute('data-key') || '';
    const style = script.getAttribute('data-style') || 'retro';
    const days = script.getAttribute('data-days') || 'all';
    const label = script.getAttribute('data-label') || 'Visitors';
    const darkMode = script.getAttribute('data-dark') || 'auto';
    
    // Create container
    const container = document.createElement('div');
    container.className = 'posthog-hit-counter';
    container.setAttribute('data-loading', 'true');
    
    // Insert container after script tag
    script.parentNode.insertBefore(container, script.nextSibling);
    
    // Create iframe to isolate styles
    const iframe = document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = 'auto';
    iframe.style.height = '80px';
    iframe.style.display = 'inline-block';
    iframe.style.overflow = 'hidden';
    
    // Build iframe URL with parameters
    const params = new URLSearchParams({
      key: apiKey,
      style: style,
      days: days,
      label: label,
      dark: darkMode,
      url: window.location.href
    });
    
    // Use the same origin as the script source
    const scriptUrl = new URL(script.src);
    const iframeSrc = scriptUrl.origin + '/widget?' + params.toString();
    console.log('PostHog Hit Counter: Creating iframe with src:', iframeSrc);
    
    iframe.src = iframeSrc;
    container.appendChild(iframe);
    console.log('PostHog Hit Counter: Iframe added to page');
    
    // Adjust iframe size once loaded
    iframe.onload = function() {
      container.setAttribute('data-loading', 'false');
      // Auto-resize based on content
      iframe.style.width = iframe.contentWindow.document.body.scrollWidth + 'px';
      iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
    };
  });
})();
`;

  return new NextResponse(embedScript, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}