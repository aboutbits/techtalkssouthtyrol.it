const shouldBeIndexed = process.env.ALLOW_SEARCH_ENGINE_INDEXING === 'true'

module.exports = {
  siteUrl: process.env.BASE_URL ?? 'https://techtalkssouthtyrol.it',
  generateRobotsTxt: true,
  // The slides of an event are not for search engines
  exclude: ['/events/*/slides'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: shouldBeIndexed ? '/' : undefined,
        disallow: shouldBeIndexed ? undefined : '/',
      },
    ],
  },
}
