import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import {
  OgFrame,
  OgPill,
  loadOgFonts,
  ogColors,
  ogSize,
} from '../../components/og/OgLayout'
import { site } from '../../data/site'

export const config = {
  runtime: 'edge',
}

/**
 * The general Open Graph image of the site.
 */
export default async function handler(request: NextRequest) {
  return new ImageResponse(
    <OgFrame>
      <OgPill>Meetup</OgPill>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 36,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 104,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
          }}
        >
          <span>Tech Talks</span>
          <span>South Tyrol</span>
        </div>
        {/* Satori removes the spaces at the edges of a text, so the spaces
            are part of the texts next to the bold words. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 36,
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            whiteSpace: 'pre',
          }}
        >
          <span>Your quarterly tech event to</span>
          <div style={{ display: 'flex' }}>
            <span style={{ fontWeight: 600 }}>connect</span>
            <span>, </span>
            <span style={{ fontWeight: 600 }}>share</span>
            <span> and </span>
            <span style={{ fontWeight: 600 }}>discuss</span>
            <span>.</span>
          </div>
        </div>
        <span style={{ fontSize: 26, color: ogColors.slateMuted }}>
          {site.website}
        </span>
      </div>
    </OgFrame>,
    {
      ...ogSize,
      fonts: await loadOgFonts(request),
    },
  )
}
