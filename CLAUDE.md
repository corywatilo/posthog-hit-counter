# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PostHog Hit Counter - A skeuomorphic, embeddable visitor counter powered by PostHog analytics. Can be used as both a React component and standalone embed script.

## Common Development Commands

```bash
# Development
npm run dev           # Start Next.js dev server on http://localhost:3000

# Building
npm run build         # Build Next.js app for production
npm run build:lib     # Build npm package with tsup

# Linting
npm run lint          # Run ESLint

# Production
npm start             # Start production server
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Bundler**: tsup (for npm package)
- **Deployment**: Vercel

### Key Files & Directories
- `/app` - Next.js app directory
  - `/page.tsx` - Demo page showcasing all counter styles
  - `/widget/page.tsx` - Iframe widget endpoint
  - `/embed/route.ts` - JavaScript embed script endpoint
- `/components/PostHogHitCounter.tsx` - Main counter component with 5 style variants
- `/lib/posthog.ts` - PostHog API integration utilities
- `/src/index.ts` - NPM package entry point

### Counter Styles
1. **Retro** - Green LCD with glow effect
2. **Digital** - Red seven-segment display
3. **Minimal** - Clean text display
4. **Classic** - Mechanical counter appearance
5. **Neon** - Purple cyberpunk glow

## PostHog Integration

Currently using mock data (`fetchPageViewsPublic` in `/lib/posthog.ts`). For production:

1. **Option 1**: Use PostHog JavaScript SDK
2. **Option 2**: Create backend API proxy endpoint
3. **Option 3**: Configure CORS for direct client-side API calls

The API integration is designed to:
- Fetch page view counts for specific URLs
- Support timeframe filtering (days or "all time")
- Auto-detect current page URL

## Deployment Notes

When deploying to Vercel:
- Set `NEXT_PUBLIC_APP_URL` environment variable to your deployed URL
- This URL is used in the embed script to reference the widget endpoint

## Dual Distribution

The project supports two distribution methods:

1. **NPM Package**: Built with tsup, exports React component
2. **Embed Script**: Served from `/embed` route, creates iframe to `/widget`