import { trackEvent } from '../../../lib/analytics'
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
import { Section, SectionHeader } from '../../shared/Section'

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
        <Brace className="pointer-events-none absolute inset-y-0 right-0 aspect-[2/5] h-full max-w-12 md:max-w-48 lg:max-w-72" />
        <div className="relative mx-auto flex max-w-content flex-col gap-10 py-12 pl-4 pr-16 md:px-10 md:pr-56 lg:py-18 lg:pr-80">
          <div className="flex flex-col items-start gap-6">
            <Pill className="motion-safe:animate-enter">
              {isUpcoming ? 'Next event' : 'Past event'}
            </Pill>
            <h1 className="text-h1 font-normal motion-safe:animate-enter motion-safe:[animation-delay:100ms]">
              Episode {event.episode}
            </h1>
          </div>
          <dl className="flex flex-wrap gap-x-12 gap-y-6 text-md motion-safe:animate-enter motion-safe:[animation-delay:200ms]">
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
                {event.venue.name ? (
                  <a
                    href={googleMapsUrl(event)}
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
                ) : (
                  <>
                    <HostName event={event} />
                    <br />
                    <a
                      href={googleMapsUrl(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-muted underline-offset-4 hover:underline"
                    >
                      {event.venue.address}, {event.venue.city}
                    </a>
                  </>
                )}
                {event.venue.name && (
                  <>
                    <br />
                    <span className="text-slate-muted">
                      Hosted by <HostName event={event} />
                    </span>
                  </>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <Section id="talks" tone="white">
        <h2 className="sr-only">Talks</h2>
        <div className="flex flex-col divide-y divide-navy/10">
          {event.talks.map((talk) => (
            <TalkDetails key={talk.title} talk={talk} />
          ))}
        </div>

        {event.notes && (
          <section className="bg-pastel mt-16 flex flex-col items-start gap-4 rounded-3xl p-6 md:p-10">
            <div className="flex flex-col items-start gap-3">
              <span className="rounded-full bg-navy/10 px-4 py-1.5 text-sm">
                Good to know
              </span>
              <h2 className="text-h3 font-normal">Additional information</h2>
            </div>
            <Markdown className="text-base text-slate">{event.notes}</Markdown>
          </section>
        )}

        {!isUpcoming && (
          <nav
            aria-label="Episodes"
            className="mt-16 flex flex-wrap justify-between gap-4"
          >
            {previous ? (
              <ButtonLink
                href={`/events/${previous.slug}`}
                variant="outline-dark"
              >
                <IconArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
                Episode {previous.episode}
              </ButtonLink>
            ) : (
              <span />
            )}
            {next && (
              <ButtonLink href={`/events/${next.slug}`} variant="outline-dark">
                Episode {next.episode}
                <IconArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            )}
          </nav>
        )}
      </Section>

      {isUpcoming && (
        <Section id="join" tone="pastel" compact>
          <SectionHeader
            title="Will you be there?"
            // Nothing follows the header in this section
            className="!mb-0"
            description={
              <p className="max-w-2xl text-md text-navy/80">
                Let us know if you join Episode {event.episode} on{' '}
                {formatDate(event.date)}. It helps us and the host to plan the
                room, the drinks and the snacks.
              </p>
            }
          >
            <ButtonLink
              href={`/api/calendar/${event.slug}`}
              onClick={() => {
                trackEvent('Attending', {
                  episode: String(event.episode),
                  source: 'event page',
                })
              }}
              variant="dark"
              download
              className="shrink-0 self-start lg:self-center"
            >
              <IconCalendar className="size-5" />I will attend
            </ButtonLink>
          </SectionHeader>
        </Section>
      )}
    </Layout>
  )
}

/**
 * The name of the host, as a link to its website if there is one.
 */
function HostName({ event }: { event: Event }) {
  if (!event.hostUrl) {
    return <>{event.host}</>
  }

  return (
    <a
      href={event.hostUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="underline-offset-4 hover:underline"
    >
      {event.host}
    </a>
  )
}
