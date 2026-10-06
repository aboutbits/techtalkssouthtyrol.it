import Image from 'next/image'
import { site } from '../../../data/site'
import { formatDate, formatSpeakerNames } from '../../../lib/format'
import { Event } from '../../../lib/types'
import {
  IconArrowRight,
  IconCalendar,
  IconMail,
  IconPin,
} from '../../icons/Icons'
import { ButtonLink } from '../../shared/Button'
import { Section, SectionHeader } from '../../shared/Section'

type NextEventProps = {
  event: Event | null
  nextEpisode: number
}

export function NextEvent({ event, nextEpisode }: NextEventProps) {
  return (
    <Section id="next-event" tone="navy">
      <SectionHeader label="Next event" tone="dark" title="Save the date" />
      {event ? (
        <NextEventDetails event={event} />
      ) : (
        <NextEventPlaceholder episode={nextEpisode} />
      )}
    </Section>
  )
}

function NextEventDetails({ event }: { event: Event }) {
  return (
    <div className="grid gap-10 overflow-hidden rounded-3xl bg-navy-light p-6 ring-1 ring-white/10 md:p-10 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-lg text-slate-muted">
            Episode {event.episode}
          </span>
          <h3 className="text-h3 font-semibold">{formatDate(event.date)}</h3>
        </div>

        <dl className="flex flex-col gap-4 text-md">
          <div className="flex gap-3">
            <dt className="sr-only">Time</dt>
            <IconCalendar className="mt-1 size-5 shrink-0 text-sky" />
            <dd>
              {event.startTime} – {event.endTime}
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="sr-only">Location</dt>
            <IconPin className="mt-1 size-5 shrink-0 text-sky" />
            <dd>
              {event.venue.name}
              <br />
              <span className="text-slate-muted">
                {event.venue.address}, {event.venue.city}
              </span>
              <br />
              <span className="text-slate-muted">Hosted by {event.host}</span>
            </dd>
          </div>
        </dl>

        <ol className="flex flex-col gap-4 border-l border-white/20 pl-6">
          <li className="flex flex-col">
            <span className="text-sm text-slate-muted">{event.startTime}</span>
            <span>Welcome and introduction</span>
          </li>
          {event.talks.map((talk) => (
            <li key={talk.title} className="flex flex-col">
              <span className="text-sm text-slate-muted">{talk.time}</span>
              <span className="font-semibold">{talk.title}</span>
              <span className="text-sm text-slate-muted">
                {formatSpeakerNames(talk.speakers.map((s) => s.name))}
              </span>
            </li>
          ))}
          <li className="flex flex-col">
            <span className="text-sm text-slate-muted">Afterwards</span>
            <span>Networking, drinks and snacks</span>
          </li>
        </ol>

        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`/events/${event.slug}`}>
            Event details
            <IconArrowRight className="size-5" />
          </ButtonLink>
        </div>
      </div>

      {event.image && (
        <div className="relative aspect-video self-start overflow-hidden rounded-2xl">
          <Image
            src={event.image}
            alt={`Episode ${event.episode} of Tech Talks South Tyrol`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
    </div>
  )
}

function NextEventPlaceholder({ episode }: { episode: number }) {
  return (
    <div className="flex flex-col gap-8 rounded-3xl bg-navy-light p-6 ring-1 ring-white/10 md:p-10 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex max-w-2xl flex-col gap-4">
        <h3 className="text-h3 font-semibold">
          Episode {episode} is in the making
        </h3>
        <p className="text-md text-slate-muted">
          We meet about once per quarter. The date, the location and the
          speakers of the next episode follow soon. Follow us on X or write us
          an email to stay up to date.
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-3">
        <ButtonLink href={site.twitterUrl} external>
          <IconMail className="size-4" />
          Get updated
        </ButtonLink>
      </div>
    </div>
  )
}
