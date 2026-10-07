import { ReactNode } from 'react'
import { bracePath } from '../shared/Brace'

// The layout of the Open Graph images. The images are rendered with
// @vercel/og, which supports inline styles and a subset of CSS only.

export const ogSize = {
  width: 1200,
  height: 630,
}

export const ogColors = {
  navy: '#071b2d',
  slate: '#31404f',
  slateMuted: '#a3b0bd',
  white: '#ffffff',
}

function svgDataUri(svg: string) {
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

const gradientStops = `
  <stop offset="0%" stop-color="#fef3ce" />
  <stop offset="20%" stop-color="#fbdcda" />
  <stop offset="45%" stop-color="#bcd5dc" />
  <stop offset="65%" stop-color="#a0d4e0" />
  <stop offset="100%" stop-color="#a7d7e0" />
`

// The same brace as in the hero, see components/shared/Brace.tsx.
const braceImage = svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 1600" preserveAspectRatio="none">
    <defs>
      <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">${gradientStops}</linearGradient>
      <radialGradient id="h" cx="0" cy="0.5" r="0.6">
        <stop offset="0%" stop-color="#fef3ce" stop-opacity="1" />
        <stop offset="100%" stop-color="#fef3ce" stop-opacity="0" />
      </radialGradient>
    </defs>
    <path d="${bracePath}" fill="url(#v)" />
    <path d="${bracePath}" fill="url(#h)" />
  </svg>
`)

/**
 * Loads the Inter font in the weights that the images use.
 * The font files in public/fonts are copies from @fontsource/inter.
 */
export async function loadOgFonts(request: Request) {
  const origin = new URL(request.url).origin
  const load = (file: string) =>
    fetch(`${origin}/fonts/${file}`).then((response) => {
      if (!response.ok) {
        throw new Error(`Font ${file} not loaded: ${response.status}`)
      }
      return response.arrayBuffer()
    })
  const [regular, semibold] = await Promise.all([
    load('inter-latin-400-normal.woff'),
    load('inter-latin-600-normal.woff'),
  ])

  return [
    {
      name: 'Inter',
      data: regular,
      style: 'normal' as const,
      weight: 400 as const,
    },
    {
      name: 'Inter',
      data: semibold,
      style: 'normal' as const,
      weight: 600 as const,
    },
  ]
}

type OgPillProps = {
  children: ReactNode
}

/**
 * The same badge as the Pill in components/shared/Pill.tsx.
 */
export function OgPill({ children }: OgPillProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignSelf: 'flex-start',
        padding: '10px 28px',
        borderRadius: 9999,
        backgroundColor: ogColors.slate,
        fontSize: 28,
      }}
    >
      {children}
    </div>
  )
}

type OgFrameProps = {
  children: ReactNode
}

/**
 * The navy background with the pastel brace on the right side.
 * The children fill the area to the left of the brace.
 */
export function OgFrame({ children }: OgFrameProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        backgroundColor: ogColors.navy,
        color: ogColors.white,
        fontFamily: 'Inter',
      }}
    >
      <img
        src={braceImage}
        width={300}
        height={ogSize.height}
        alt=""
        style={{ position: 'absolute', top: 0, right: 0 }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: ogSize.width - 300,
          height: '100%',
          padding: '56px 48px 56px 72px',
        }}
      >
        {children}
      </div>
    </div>
  )
}
