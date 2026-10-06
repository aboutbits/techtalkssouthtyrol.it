import { EventsPage } from '../../components/pages/events/EventsPage'
import { getAllEvents, splitEvents } from '../../lib/events'
import { Event } from '../../lib/types'

export function getStaticProps() {
  const { past } = splitEvents(getAllEvents())

  return {
    props: {
      events: past,
    },
  }
}

export default function Page({ events }: { events: Event[] }) {
  return <EventsPage events={events} />
}
