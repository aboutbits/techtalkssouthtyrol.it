import classNames from 'classnames'
import Link from 'next/link'
import { ReactNode } from 'react'
import { formatShortDate, formatSpeakerNames } from '../../lib/format'
import { Event } from '../../lib/types'
import {
  IconCalendar,
  IconMegaphone,
  IconPin,
  IconSlides,
} from '../icons/Icons'

type EventCardProps = {
  event: Event
  isUpcoming?: boolean
}

export function EventCard({ event, isUpcoming = false }: EventCardProps) {
  const slidesCount = event.talks.filter((talk) => talk.slides).length

  return (
    <Link
      href={`/events/${event.slug}`}
      className={classNames(
        'relative flex flex-col rounded-3xl text-navy ring-1 ring-navy/10 transition-shadow hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy',
        isUpcoming ? 'bg-pastel' : 'bg-white',
      )}
    >
      {isUpcoming ? (
        <CornerBadge label="Next event" className="bg-navy text-white">
          <IconMegaphone className="size-5 text-sky" />
        </CornerBadge>
      ) : (
        slidesCount > 0 && (
          <CornerBadge label="Slides" className="bg-cream">
            <IconSlides className="size-5" />
          </CornerBadge>
        )
      )}
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
        <div className="flex flex-col gap-1">
          <h3 className="text-[2rem] font-semibold leading-10">
            Episode {event.episode}
          </h3>
          <p className="text-sm text-slate">
            Hosted by{' '}
            <span className="font-semibold text-navy">{event.host}</span>
          </p>
        </div>
        <ul className="flex flex-1 flex-col gap-4">
          {event.talks.map((talk) => (
            <li
              key={talk.title}
              className={classNames(
                'flex flex-col border-l-[3px] pl-3',
                isUpcoming ? 'border-white' : 'border-sky',
              )}
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
