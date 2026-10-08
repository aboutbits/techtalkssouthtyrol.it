import { Event } from '../../../lib/types'
import { EventCard } from '../../events/EventCard'
import { IconArrowRight } from '../../icons/Icons'
import { ButtonLink } from '../../shared/Button'
import { Section, SectionHeader } from '../../shared/Section'

export function PastEvents({ events }: { events: Event[] }) {
  return (
    <Section id="past-events" tone="white">
      <SectionHeader label="Past events" title="Recent episodes">
        <ButtonLink href="/events" variant="outline-dark">
          All past events
          <IconArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </ButtonLink>
      </SectionHeader>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <li key={event.slug} className="flex">
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
