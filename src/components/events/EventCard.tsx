import classNames from 'classnames'
import Link from 'next/link'
import { ReactNode } from 'react'
import { formatShortDate, formatSpeakerNames } from '../../lib/format'
import { Event } from '../../lib/types'
import {
  IconBuilding,
  IconCalendar,
  IconMegaphone,
  IconPin,
} from '../icons/Icons'

type EventCardProps = {
  event: Event
  isUpcoming?: boolean
}

export function EventCard({ event, isUpcoming = false }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="bg-pastel relative flex flex-col rounded-3xl text-navy ring-1 ring-navy/10 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
    >
      {isUpcoming && (
        <CornerBadge label="Next event" className="bg-navy text-white">
          <IconMegaphone className="size-5 text-sky" />
        </CornerBadge>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-[2rem] font-semibold leading-10">
            Episode {event.episode}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate">
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar className="size-4" />
              {formatShortDate(event.date)}
            </span>
            <span className="flex basis-full items-center gap-1.5">
              <IconBuilding className="size-4 shrink-0" />
              <span className="sr-only">Host: </span>
              {event.host}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconPin className="size-4" />
              {event.venue.city}
            </span>
          </div>
        </div>
        <ul className="flex flex-1 flex-col gap-3">
          {event.talks.map((talk) => (
            <li
              key={talk.title}
              className="flex flex-col rounded-2xl bg-white/60 px-4 py-3"
            >
              <span className="font-medium">{talk.title}</span>
              <span className="text-sm text-slate">
                {formatSpeakerNames(talk.speakers.map((s) => s.name))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}

type CornerBadgeProps = {
  label: string
  className: string
  children: ReactNode
}

/**
 * A badge with an icon and a label that sits on the top-right corner of the card.
 */
function CornerBadge({ label, className, children }: CornerBadgeProps) {
  return (
    <span
      className={classNames(
        'absolute -top-5 right-4 inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-semibold ring-4 ring-white',
        className,
      )}
    >
      {children}
      {label}
    </span>
  )
}
