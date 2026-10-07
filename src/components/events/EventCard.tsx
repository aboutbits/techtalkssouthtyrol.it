import Link from 'next/link'
import { formatShortDate, formatSpeakerNames } from '../../lib/format'
import { Event } from '../../lib/types'
import { IconCalendar, IconPin, IconSlides } from '../icons/Icons'

export function EventCard({ event }: { event: Event }) {
  const slidesCount = event.talks.filter((talk) => talk.slides).length

  return (
    <Link
      href={`/events/${event.slug}`}
      className="flex flex-col overflow-hidden rounded-3xl bg-white text-navy ring-1 ring-navy/10 transition-shadow hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
    >
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate">
          <span className="inline-flex items-center gap-1.5">
            <IconCalendar className="size-4" />
            {formatShortDate(event.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconPin className="size-4" />
            {event.venue.city}
          </span>
        </div>
        <h3 className="text-xl font-semibold">Episode {event.episode}</h3>
        <ul className="flex flex-1 flex-col gap-3">
          {event.talks.map((talk) => (
            <li key={talk.title} className="flex flex-col">
              <span className="font-medium">{talk.title}</span>
              <span className="text-sm text-slate">
                {formatSpeakerNames(talk.speakers.map((s) => s.name))}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between pt-2 text-sm">
          <span className="text-slate">Hosted by {event.host}</span>
          {slidesCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 font-medium">
              <IconSlides className="size-4" />
              Slides
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
