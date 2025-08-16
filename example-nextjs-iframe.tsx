'use client'

interface HitCounterProps {
  className?: string
  days?: string
  style?: string
  label?: string
}

export default function HitCounter({ 
  className, 
  days = 'all',
  style = 'retro',
  label = 'Visitors'
}: HitCounterProps) {
  // Get current page URL
  const url = typeof window !== 'undefined' ? window.location.href : ''
  
  return (
    <div className={className}>
      <iframe
        src={`http://localhost:3000/widget?style=${style}&days=${days}&label=${label}&url=${encodeURIComponent(url)}`}
        style={{
          border: 'none',
          width: '200px',
          height: '80px',
          display: 'inline-block'
        }}
        title="PostHog Hit Counter"
      />
    </div>
  )
}