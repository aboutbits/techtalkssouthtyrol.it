import { Event } from '../../../lib/types'
import { EventCard } from '../../events/EventCard'
import { Layout } from '../../layout/Layout'
import { Meta } from '../../layout/Meta'
import { Brace } from '../../shared/Brace'
import { Pill } from '../../shared/Pill'

export function EventsPage({ events }: { events: Event[] }) {
  const years = Array.from(
    new Set(events.map((event) => event.date.substring(0, 4))),
  )

  return (
    <Layout>
      <Meta
        title="Past events"
        description="All past episodes of Tech Talks South Tyrol, with talks, speakers and slides."
        path="/events"
      />
      <section className="relative overflow-hidden bg-navy text-white">
        <Brace className="pointer-events-none absolute inset-y-0 right-0 h-full w-12 md:w-48 lg:w-72" />
        <div className="relative mx-auto flex max-w-content flex-col items-start gap-8 py-18 pl-4 pr-16 md:px-10 md:pr-56 lg:py-24 lg:pr-80">
          <Pill>Past events</Pill>
          <h1 className="text-h1 font-normal">
            {events.length} episodes,{' '}
            {events.reduce((sum, event) => sum + event.talks.length, 0)} talks
          </h1>
          <p className="max-w-2xl text-lg text-slate-muted">
            Browse all past episodes of Tech Talks South Tyrol. Open an episode
            to read the abstracts and to get the slides of the talks.
          </p>
        </div>
      </section>
      <div className="bg-white text-navy">
        <div className="mx-auto flex max-w-content flex-col gap-18 px-4 py-18 md:px-10 lg:py-24">
          {years.map((year) => (
            <section key={year} className="flex flex-col gap-8">
              <h2 className="text-h3 font-semibold">{year}</h2>
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events
                  .filter((event) => event.date.startsWith(year))
                  .map((event) => (
                    <li key={event.slug} className="flex">
                      <EventCard event={event} />
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  )
}
