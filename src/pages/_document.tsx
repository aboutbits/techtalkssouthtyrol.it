import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth bg-navy">
      <Head />
      <body className="font-sans text-navy antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
