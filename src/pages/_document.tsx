import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="scroll-smooth">
      <Head />
      <body className="text-gray antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
