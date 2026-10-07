import {
  EventsPage,
  EventsPageProps,
} from '../../components/pages/events/EventsPage'
import {
  getAllEvents,
  getNextEventPath,
  revalidateSeconds,
  splitEvents,
} from '../../lib/events'

export function getStaticProps() {
  const { upcoming, past } = splitEvents(getAllEvents())

  return {
    props: {
      // Newest first, like the past events
      events: [...upcoming].reverse().concat(past),
      upcomingSlugs: upcoming.map((event) => event.slug),
      nextEventPath: getNextEventPath(),
    },
    revalidate: revalidateSeconds,
  }
}

export default function Page(props: EventsPageProps) {
  return <EventsPage {...props} />
}
