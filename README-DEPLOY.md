# Deploy Your Own PostHog Hit Counter

Since PostHog requires secure API keys, each user needs their own deployment. Don't worry - it's free and takes just 2 minutes!

## 🚀 One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fposthog-hit-counter&env=POSTHOG_PERSONAL_API_KEY,POSTHOG_PROJECT_ID&envDescription=PostHog%20API%20credentials%20for%20your%20hit%20counter&envLink=https%3A%2F%2Fposthog.com%2Fdocs%2Fapi&project-name=my-hit-counter&repository-name=my-hit-counter)

## 📋 Setup Steps

1. **Click "Deploy with Vercel"** above
2. **Create your PostHog Personal API Key:**
   - Go to [PostHog](https://app.posthog.com) → Project Settings → Personal API Keys
   - Create new key with `event:read` scope
   - Copy the key

3. **Fill in environment variables:**
   - `POSTHOG_PERSONAL_API_KEY`: Your personal API key
   - `POSTHOG_PROJECT_ID`: Your project ID (found in PostHog settings)

4. **Deploy!** Your counter will be live at `your-app.vercel.app`

## 🎯 Using Your Counter

Once deployed, use your counter anywhere:

### As an Embed Script
```html
<script 
  src="https://your-app.vercel.app/embed" 
  data-style="retro"
  data-days="30"
></script>
```

### In React/Next.js
```bash
npm install posthog-hit-counter
```

```jsx
import { PostHogHitCounter } from 'posthog-hit-counter';

<PostHogHitCounter 
  style="digital"
  timeframe={7}
/>
```

## 💰 Cost

- **Vercel**: Free tier includes 100GB bandwidth/month
- **PostHog**: Free tier includes 1M events/month
- **Total cost**: $0 for most sites

## 🔒 Security

Your API key is stored securely in Vercel's environment variables and never exposed to browsers. The `/api/pageviews` endpoint acts as a secure proxy.

## 🛠 Customization

After deploying, you can:
- Fork the repo to customize styles
- Add new counter designs
- Modify the API integration
- Add caching for better performance

## 🤝 Alternative: Shared Instance

If you don't want to deploy your own:
1. Use the demo at: https://posthog-hit-counter.vercel.app (shows random numbers)
2. Contact us for a shared instance with your PostHog data
3. Use alternative services like GoatCounter or Plausible that support public APIs