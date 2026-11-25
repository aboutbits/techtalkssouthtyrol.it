import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    APP_VERSION: process.env.APP_VERSION ?? 'xxx',
    PLAUSIBLE_DOMAIN: process.env.PLAUSIBLE_DOMAIN,
    ALLOW_SEARCH_ENGINE_INDEXING:
      process.env.ALLOW_SEARCH_ENGINE_INDEXING ?? 'false',
    BASE_URL: process.env.BASE_URL ?? 'http://localhost:3000',
  },
  // The pages read the event files at runtime when they revalidate.
  outputFileTracingIncludes: {
    '/*': ['./src/data/events/**/*'],
    '/events/*': ['./src/data/events/**/*'],
  },
  // The slides of an event are not for search engines. The page also has a
  // robots meta tag, and next-sitemap.config.js excludes it from the sitemap.
  // eslint-disable-next-line @typescript-eslint/require-await
  headers: async () => [
    {
      source: '/events/:slug/slides',
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    },
  ],
  webpack: (config) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config
  },
}

export default nextConfig
