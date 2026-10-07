import { EventsPage } from '../../components/pages/events/EventsPage'
import {
  getAllEvents,
  getNextEventPath,
  revalidateSeconds,
  splitEvents,
} from '../../lib/events'
import { Event } from '../../lib/types'

export function getStaticProps() {
  const { past } = splitEvents(getAllEvents())

  return {
    props: {
      events: past,
      nextEventPath: getNextEventPath(),
    },
    revalidate: revalidateSeconds,
  }
}

export default function Page({ events }: { events: Event[] }) {
  return <EventsPage events={events} />
}
