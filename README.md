# PostHog Hit Counter

A skeuomorphic, embeddable hit counter powered by PostHog analytics. Display visitor counts on your website with beautiful retro-inspired designs.

![Counter Styles](hit-counters.jpg)

## Features

- 🎨 **5 Beautiful Styles**: Retro, Digital, Minimal, Classic, and Neon
- 📊 **PostHog Integration**: Pull real visitor data from your PostHog analytics
- 🌓 **Dark Mode Support**: Automatic dark mode detection
- 📦 **Dual Distribution**: Use as React component or embed script
- ⚡ **Lightweight**: Minimal bundle size
- 🔧 **Zero Config**: Works out of the box

## Installation

### As a React Component

```bash
npm install posthog-hit-counter
```

```jsx
import { PostHogHitCounter } from 'posthog-hit-counter';

function MyApp() {
  return (
    <PostHogHitCounter
      projectApiKey="phc_your_api_key"
      style="retro"
      timeframe={30}
      label="Visitors"
    />
  );
}
```

### As an Embed Script

Add this script tag to any HTML page:

```html
<script 
  src="https://your-domain.vercel.app/embed" 
  data-key="phc_your_api_key" 
  data-style="digital" 
  data-days="30"
  data-label="Page Views"
></script>
```

## Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `projectApiKey` | `string` | - | Your PostHog project API key |
| `style` | `"retro" \| "digital" \| "minimal" \| "classic" \| "neon"` | `"retro"` | Counter visual style |
| `timeframe` | `number \| "all"` | `"all"` | Days to count (or "all" for all time) |
| `label` | `string` | `"Visitors"` | Label text below counter |
| `darkMode` | `"auto" \| "light" \| "dark"` | `"auto"` | Dark mode setting |
| `url` | `string` | Current page | URL to track (defaults to current page) |

## Styles

- **Retro**: Classic green LCD display with glow effect
- **Digital**: Red seven-segment display style
- **Minimal**: Clean, modern text display
- **Classic**: Traditional mechanical counter look
- **Neon**: Purple glowing cyberpunk aesthetic

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Build npm package
npm run build:lib
```

## Deployment

The project is designed to be deployed on Vercel:

1. Fork this repository
2. Import to Vercel
3. Set `NEXT_PUBLIC_APP_URL` environment variable to your deployment URL
4. Deploy!

## License

MIT