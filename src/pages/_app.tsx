import { Inter } from 'next/font/google'
import Script from 'next/script'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
      {process.env.PLAUSIBLE_DOMAIN && (
        <Script
          data-domain={process.env.PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/plausible.js"
          strategy="afterInteractive"
        />
      )}
    </div>
  )
}
