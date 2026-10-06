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
