import Image from 'next/image'
import Link from 'next/link'
import { formatDate, formatSpeakerNames } from '../../../lib/format'
import { eventOgImagePath } from '../../../lib/og'
import { Event } from '../../../lib/types'
import { TalkCard } from '../../events/TalkCard'
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
            All past events
          </Link>
          <div className="flex flex-col items-start gap-6">
            <Pill>{isUpcoming ? 'Next event' : 'Past event'}</Pill>
            <h1 className="text-h1 font-normal">Episode {event.episode}</h1>
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
        </div>
      </section>

      <div className="bg-pastel text-navy">
        <div className="mx-auto flex max-w-content flex-col gap-10 px-4 py-18 md:px-10 lg:py-24">
          {event.image && (
            <div className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={event.image}
                alt={`Episode ${event.episode} of Tech Talks South Tyrol`}
                fill
                priority
                sizes="(min-width: 1024px) 48rem, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <h2 className="pt-8 text-h2">Talks</h2>
          <div className="flex flex-col gap-6">
            {event.talks.map((talk) => (
              <TalkCard key={talk.title} talk={talk} />
            ))}
          </div>

          {event.notes && (
            <div className="rounded-3xl bg-white/70 p-6 md:p-10">
              <Markdown className="text-md">{event.notes}</Markdown>
            </div>
          )}

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
              <ButtonLink href={`/events/${next.slug}`} variant="outline-dark">
                Episode {next.episode}
                <IconArrowRight className="size-5" />
              </ButtonLink>
            )}
          </nav>
        </div>
      </div>
    </Layout>
  )
}
