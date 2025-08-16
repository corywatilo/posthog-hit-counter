interface HitCounterProps {
  className?: string
  days?: string
  style?: string
}

export default function HitCounter({ 
  className, 
  days = 'all',
  style = 'retro' 
}: HitCounterProps) {
  return (
    <div className={className}>
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <script 
              src="http://localhost:3000/embed"
              data-days="${days}"
              data-style="${style}"
            ></script>
          `
        }}
      />
    </div>
  )
}