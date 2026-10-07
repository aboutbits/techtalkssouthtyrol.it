import { Inter } from 'next/font/google'
import Script from 'next/script'
import {
  NextEventPathContext,
  defaultNextEventPath,
} from '../components/layout/NextEventPath'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({
  Component,
  pageProps,
}: AppProps<{ nextEventPath?: string }>) {
  return (
    <div className={`${inter.variable} font-sans`}>
      <NextEventPathContext.Provider
        value={pageProps.nextEventPath ?? defaultNextEventPath}
      >
        <Component {...pageProps} />
      </NextEventPathContext.Provider>
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
