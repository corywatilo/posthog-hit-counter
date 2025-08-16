import { NextResponse } from "next/server";

// This endpoint serves the embeddable JavaScript
export async function GET() {
  const embedScript = `
(function() {
  // Find all script tags with our data attributes
  const scripts = document.querySelectorAll('script[src*="hit-counter"][data-key]');
  
  scripts.forEach(function(script) {
    const apiKey = script.getAttribute('data-key');
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
    iframe.src = scriptUrl.origin + '/widget?' + params.toString();
    
    container.appendChild(iframe);
    
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