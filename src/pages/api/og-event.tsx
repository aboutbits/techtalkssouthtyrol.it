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
import { formatDate } from '../../lib/format'

export const config = {
  runtime: 'edge',
}

/**
 * The Open Graph image of an event.
 * Build the path with eventOgImagePath from lib/og.ts.
 */
export default async function handler(request: NextRequest) {
  const params = new URL(request.url).searchParams
  const episode = params.get('episode') ?? ''
  const date = params.get('date') ?? ''
  const city = params.get('city') ?? ''
  const speakers = params.getAll('speakers')
  const talks = params
    .getAll('talk')
    .slice(0, 2)
    .map((title, index) => ({ title, speakers: speakers[index] ?? '' }))

  return new ImageResponse(
    <OgFrame>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <OgPill>Meetup</OgPill>
        <span style={{ fontSize: 28, fontWeight: 600 }}>{site.name}</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          marginTop: 36,
        }}
      >
        <span
          style={{
            fontSize: 80,
            lineHeight: 1,
            letterSpacing: '-0.035em',
          }}
        >
          Episode {episode}
        </span>
        <span style={{ fontSize: 28, color: ogColors.slateMuted }}>
          {[/^\d{4}-\d{2}-\d{2}$/.test(date) ? formatDate(date) : '', city]
            .filter((part) => part !== '')
            .join(' · ')}
        </span>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 24,
        }}
      >
        {talks.map((talk) => (
          <div
            key={talk.title}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              paddingLeft: 24,
              borderLeft: '4px solid #a0d4e0',
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 600,
                lineHeight: 1.2,
                lineClamp: 2,
              }}
            >
              {talk.title}
            </span>
            <span style={{ fontSize: 24, color: ogColors.slateMuted }}>
              {talk.speakers}
            </span>
          </div>
        ))}
      </div>
    </OgFrame>,
    {
      ...ogSize,
      fonts: await loadOgFonts(request),
    },
  )
}
