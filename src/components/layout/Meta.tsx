import Head from 'next/head'
import { site } from '../../data/site'

type MetaProps = {
  title?: string
  description?: string
  image?: string
  path?: string
}

export function Meta({
  title,
  description = site.description,
  image,
  path = '',
}: MetaProps) {
  const shouldBeIndexed = process.env.ALLOW_SEARCH_ENGINE_INDEXING === 'true'
  const baseUrl = String(process.env.BASE_URL)
  const ogImage = image !== undefined && image !== '' ? image : '/api/og'
  const fullTitle = title ? `${title} | ${site.name}` : site.name

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {!shouldBeIndexed && <meta name="robots" content="noindex, nofollow" />}

      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#071b2d" />
      <link rel="icon" type="image/svg+xml" href="/images/icons/icon.svg" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/icons/180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/icons/32x32.png"
      />

      <meta property="og:url" content={`${baseUrl}${path}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={site.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
    </Head>
  )
}
