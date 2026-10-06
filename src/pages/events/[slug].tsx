import { GetStaticPropsContext } from 'next'
import { EventPage } from '../../components/pages/event/EventPage'
import { getAllEvents, getEventSlugs, splitEvents } from '../../lib/events'

type Props = Parameters<typeof EventPage>[0]

export function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>): { props: Props } {
  if (params === undefined) {
    throw new Error('Error while rendering event: params is undefined')
  }

  const events = getAllEvents().sort((a, b) => a.episode - b.episode)
  const index = events.findIndex((event) => event.slug === params.slug)
  const event = events[index]

  if (event === undefined) {
    throw new Error(`Event not found: ${params.slug}`)
  }

  const { upcoming } = splitEvents([event])
  const previous = events[index - 1]
  const next = events[index + 1]

  return {
    props: {
      event,
      isUpcoming: upcoming.length > 0,
      previous: previous
        ? { slug: previous.slug, episode: previous.episode }
        : null,
      next: next ? { slug: next.slug, episode: next.episode } : null,
    },
  }
}

export function getStaticPaths() {
  return {
    paths: getEventSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export default function Page(props: Props) {
  return <EventPage {...props} />
}
