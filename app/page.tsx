import { PostHogHitCounter } from "@/components/PostHogHitCounter";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            PostHog Hit Counter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Skeuomorphic, embeddable hit counters powered by PostHog analytics
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Counter Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Retro Style</h3>
              <div className="flex justify-center">
                <PostHogHitCounter style="retro" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Digital Style</h3>
              <div className="flex justify-center">
                <PostHogHitCounter style="digital" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Minimal Style</h3>
              <div className="flex justify-center">
                <PostHogHitCounter style="minimal" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Classic Style</h3>
              <div className="flex justify-center">
                <PostHogHitCounter style="classic" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Neon Style</h3>
              <div className="flex justify-center">
                <PostHogHitCounter style="neon" />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Usage</h2>
          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-gray-300">
              <code>{`// React Component
<PostHogHitCounter
  projectApiKey="phc_..."
  style="retro"
  timeframe={30}
  label="Visitors"
/>

// Embed Script
<script 
  src="https://your-domain.com/embed" 
  data-key="phc_..." 
  data-style="digital" 
  data-days="all"
  data-label="Page Views"
></script>`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Configuration</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-2 text-gray-700 dark:text-gray-300">Prop</th>
                  <th className="text-left py-2 text-gray-700 dark:text-gray-300">Type</th>
                  <th className="text-left py-2 text-gray-700 dark:text-gray-300">Default</th>
                  <th className="text-left py-2 text-gray-700 dark:text-gray-300">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 text-gray-600 dark:text-gray-400">projectApiKey</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">string</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">-</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">Your PostHog project API key</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 text-gray-600 dark:text-gray-400">style</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">string</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">retro</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">Counter visual style</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 text-gray-600 dark:text-gray-400">timeframe</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">number | "all"</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">all</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">Days to count (or "all" for all time)</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="py-2 text-gray-600 dark:text-gray-400">label</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">string</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">Visitors</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">Label text below counter</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600 dark:text-gray-400">darkMode</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">string</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">auto</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">Dark mode: "auto", "light", or "dark"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}