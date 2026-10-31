import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import {
  EventSlidesContext,
  renderSlide,
} from '../../../components/slides/EventSlides'
import {
  SlideDeck,
  slideHeight,
  slideWidth,
} from '../../../components/slides/SlideDeck'
import { site } from '../../../data/site'
import { getAllEvents, getEventSlugs } from '../../../lib/events'
import { getSlides } from '../../../lib/slides'
import { SlideConfig } from '../../../lib/types'

type Props = EventSlidesContext & {
  slides: SlideConfig[]
}

/**
 * The presentation for the evening of an event, at /events/<slug>/slides.
 * No page links to it, and search engines must not index it (see also
 * next.config.ts and next-sitemap.config.js).
 */
export function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>): { props: Props } {
  if (params === undefined) {
    throw new Error('Error while rendering slides: params is undefined')
  }

  const events = getAllEvents()
  const event = events.find((item) => item.slug === params.slug)

  if (event === undefined) {
    throw new Error(`Event not found: ${params.slug}`)
  }

  return {
    props: {
      event,
      nextEvent:
        events.find((item) => item.episode === event.episode + 1) ?? null,
      slides: getSlides(event),
    },
  }
}

export function getStaticPaths() {
  return {
    paths: getEventSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export default function Page({ slides, ...context }: Props) {
  return (
    <>
      <Head>
        <title>{`Episode ${context.event.episode} slides | ${site.name}`}</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" type="image/svg+xml" href="/images/icons/icon.svg" />
      </Head>
      {/* One slide per page when the slides are printed or saved as a PDF */}
      <style>{`
        @page { size: ${slideWidth}px ${slideHeight}px; margin: 0; }
        @media print {
          html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          *, *::before, *::after { animation: none !important; }
        }
      `}</style>
      <SlideDeck slides={slides.map((slide) => renderSlide(slide, context))} />
    </>
  )
}
