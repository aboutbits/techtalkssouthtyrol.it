import { HomePage, HomePageProps } from '../components/pages/home/HomePage'
import {
  getAllEvents,
  getNextEventPath,
  revalidateSeconds,
  splitEvents,
} from '../lib/events'

export function getStaticProps(): {
  props: HomePageProps & { nextEventPath: string }
  revalidate: number
} {
  const events = getAllEvents()
  const { upcoming, past } = splitEvents(events)
  const talks = events.flatMap((event) => event.talks)
  const latestEpisode = Math.max(0, ...events.map((event) => event.episode))

  return {
    props: {
      nextEventPath: getNextEventPath(),
      nextEvent: upcoming[0] ?? null,
      nextEpisode: latestEpisode + 1,
      recentEvents: past.slice(0, 3),
      stats: {
        episodes: past.length,
        talks: past.flatMap((event) => event.talks).length,
        speakers: new Set(
          talks.flatMap((talk) => talk.speakers.map((s) => s.name)),
        ).size,
        cities: new Set(events.map((event) => event.venue.city)).size,
      },
    },
    revalidate: revalidateSeconds,
  }
}

export default function Page(props: HomePageProps) {
  return <HomePage {...props} />
}
