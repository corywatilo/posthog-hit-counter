'use client'

import { useEffect, useRef } from 'react'

interface HitCounterProps {
  className?: string
}

export default function HitCounter({ className }: HitCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create and append script tag
    const script = document.createElement('script')
    script.src = 'http://localhost:3000/embed'
    script.setAttribute('data-days', 'all')
    script.async = true
    
    script.onload = () => {
      console.log('Hit counter loaded successfully')
    }
    
    script.onerror = (e) => {
      console.error('Hit counter failed to load:', e)
    }
    
    containerRef.current.appendChild(script)

    // Cleanup
    return () => {
      if (containerRef.current && script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <div className={className}>
      <div ref={containerRef}>
        {/* Script and counter will be inserted here */}
      </div>
    </div>
  )
}