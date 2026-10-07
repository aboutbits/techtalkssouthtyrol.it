import Link from 'next/link'
import {
  formatDate,
  formatSpeakerNames,
  googleMapsUrl,
} from '../../../lib/format'
import { eventOgImagePath } from '../../../lib/og'
import { Event } from '../../../lib/types'
import { TalkDetails } from '../../events/TalkDetails'
import {
  IconArrowLeft,
  IconArrowRight,
  IconCalendar,
  IconPin,
} from '../../icons/Icons'
import { Layout } from '../../layout/Layout'
import { Meta } from '../../layout/Meta'
import { Brace } from '../../shared/Brace'
import { ButtonLink } from '../../shared/Button'
import { Markdown } from '../../shared/Markdown'
import { Pill } from '../../shared/Pill'

type EventPageProps = {
  event: Event
  isUpcoming: boolean
  previous: { slug: string; episode: number } | null
  next: { slug: string; episode: number } | null
}

export function EventPage({
  event,
  isUpcoming,
  previous,
  next,
}: EventPageProps) {
  const description = `Episode ${event.episode} of Tech Talks South Tyrol on ${formatDate(event.date)} in ${event.venue.city}: ${event.talks
    .map(
      (talk) =>
        `"${talk.title}" by ${formatSpeakerNames(talk.speakers.map((s) => s.name))}`,
    )
    .join(' and ')}.`

  return (
    <Layout>
      <Meta
        title={`Episode ${event.episode}`}
        description={description}
        image={eventOgImagePath(event)}
        path={`/events/${event.slug}`}
      />

      <section className="relative overflow-hidden bg-navy text-white">
        <Brace className="pointer-events-none absolute inset-y-0 right-0 h-full w-12 md:w-48 lg:w-72" />
        <div className="relative mx-auto flex max-w-content flex-col gap-10 py-12 pl-4 pr-16 md:px-10 md:pr-56 lg:py-18 lg:pr-80">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 self-start text-sm text-slate-muted hover:text-white"
          >
            <IconArrowLeft className="size-4" />
            All events
          </Link>
          <div className="flex flex-col items-start gap-6">
            <Pill>{isUpcoming ? 'Next event' : 'Past event'}</Pill>
            <div className="flex flex-col gap-3">
              <h1 className="text-h1 font-normal">Episode {event.episode}</h1>
              <p className="text-md text-slate-muted md:text-lg">
                Hosted by{' '}
                {event.hostUrl ? (
                  <a
                    href={event.hostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sky underline decoration-sky/40 underline-offset-4 transition-colors hover:decoration-sky"
                  >
                    {event.host}
                  </a>
                ) : (
                  <span className="font-semibold text-sky">{event.host}</span>
                )}
              </p>
            </div>
          </div>
          <dl className="grid gap-6 text-md md:grid-cols-2">
            <div className="flex gap-3">
              <dt className="sr-only">Date and time</dt>
              <IconCalendar className="mt-1 size-5 shrink-0 text-sky" />
              <dd>
                {formatDate(event.date)}
                <br />
                <span className="text-slate-muted">
                  {event.startTime} – {event.endTime}
                </span>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="sr-only">Location</dt>
              <IconPin className="mt-1 size-5 shrink-0 text-sky" />
              <dd>
                <a
                  href={googleMapsUrl(event.venue)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <span className="underline-offset-4 group-hover:underline">
                    {event.venue.name}
                  </span>
                  <br />
                  <span className="text-slate-muted underline-offset-4 group-hover:underline">
                    {event.venue.address}, {event.venue.city}
                  </span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="bg-white text-navy">
        <div className="mx-auto flex max-w-content flex-col gap-10 px-4 py-18 md:px-10 lg:py-24">
          <h2 className="text-h2">Talks</h2>
          <div className="flex flex-col divide-y divide-navy/10 border-t border-navy/10">
            {event.talks.map((talk) => (
              <TalkDetails key={talk.title} talk={talk} />
            ))}
          </div>

          {event.notes && (
            <div className="bg-pastel rounded-3xl p-6 md:p-10">
              <Markdown className="text-md">{event.notes}</Markdown>
            </div>
          )}

          {!isUpcoming && (
            <nav
              aria-label="Episodes"
              className="flex flex-wrap justify-between gap-4 pt-8"
            >
              {previous ? (
                <ButtonLink
                  href={`/events/${previous.slug}`}
                  variant="outline-dark"
                >
                  <IconArrowLeft className="size-5" />
                  Episode {previous.episode}
                </ButtonLink>
              ) : (
                <span />
              )}
              {next && (
                <ButtonLink
                  href={`/events/${next.slug}`}
                  variant="outline-dark"
                >
                  Episode {next.episode}
                  <IconArrowRight className="size-5" />
                </ButtonLink>
              )}
            </nav>
          )}
        </div>
      </div>

      {isUpcoming && (
        <section className="bg-pastel text-navy">
          <div className="mx-auto flex max-w-content flex-col items-start gap-8 px-4 py-18 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:py-24">
            <div className="flex max-w-2xl flex-col gap-4">
              <h2 className="text-h2">Will you be there?</h2>
              <p className="text-md text-navy/80">
                Let us know if you join Episode {event.episode} on{' '}
                {formatDate(event.date)}. It helps us and the host to plan the
                room, the drinks and the snacks.
              </p>
            </div>
            <ButtonLink
              href={`/api/calendar/${event.slug}`}
              variant="dark"
              download
              className="shrink-0"
            >
              <IconCalendar className="size-5" />I will attend
            </ButtonLink>
          </div>
        </section>
      )}
    </Layout>
  )
}
