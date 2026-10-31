import classNames from 'classnames'
import Image from 'next/image'
import { ReactNode } from 'react'
import { site } from '../../data/site'
import {
  formatDate,
  formatInitials,
  formatSpeakerNames,
  formatTalkTime,
  getVenueName,
} from '../../lib/format'
import { Event, SlideConfig, Speaker } from '../../lib/types'
import {
  IconCalendar,
  IconDiscord,
  IconGlobe,
  IconLinkedIn,
  IconMail,
  IconPin,
  IconX,
} from '../icons/Icons'
import { Markdown } from '../shared/Markdown'
import { Slide, SlideLabel } from './Slide'

export type EventSlidesContext = {
  event: Event
  // The event after this one, if it is already in the data
  nextEvent: Event | null
}

/**
 * Returns the slide for an entry of the presentation.
 * To add a new type of slide, add it to SlideConfig in lib/types.ts, to the
 * list in lib/slides.ts and to this function.
 */
export function renderSlide(slide: SlideConfig, context: EventSlidesContext) {
  const { event, nextEvent } = context

  switch (slide.type) {
    case 'title':
      return <TitleSlide event={event} />
    case 'about':
      return <AboutSlide event={event} />
    case 'agenda':
      return <AgendaSlide event={event} />
    case 'host':
      return <HostSlide event={event} />
    case 'talk':
      return <TalkSlide event={event} number={slide.talk} />
    case 'next-event':
      return <NextEventSlide event={event} nextEvent={nextEvent} />
    case 'get-involved':
      return <GetInvolvedSlide event={event} />
    case 'custom':
      return <CustomSlide event={event} slide={slide} />
  }
}

const enter = 'motion-safe:animate-enter'
const enterLate =
  'motion-safe:animate-enter motion-safe:[animation-delay:150ms]'
const enterLater =
  'motion-safe:animate-enter motion-safe:[animation-delay:300ms]'

function TitleSlide({ event }: { event: Event }) {
  return (
    <Slide
      episode={event.episode}
      tone="navy"
      brace
      footer={false}
      className="justify-between"
    >
      <div className="flex flex-col gap-[64px]">
        <SlideLabel tone="navy" className={enter}>
          Episode {event.episode}
        </SlideLabel>
        <h1
          className={`text-[200px] font-normal leading-[0.95] tracking-[-0.04em] ${enterLate}`}
        >
          Tech Talks
          <br />
          South Tyrol
        </h1>
      </div>
      <EventFacts event={event} className={enterLater} />
    </Slide>
  )
}

/**
 * The date and the location of an event. The location shows the host, or the
 * venue and the host if the event does not take place at the host.
 */
function EventFacts({
  event,
  tone = 'dark',
  className,
}: {
  event: Event
  // Dark for a navy background, light for a white or a pastel background
  tone?: 'dark' | 'light'
  className?: string
}) {
  const iconClassName = classNames(
    'mt-[6px] size-[36px] shrink-0',
    tone === 'dark' ? 'text-sky' : 'text-navy',
  )
  const mutedClassName = tone === 'dark' ? 'text-slate-muted' : 'text-slate'

  return (
    <dl
      className={classNames(
        'flex gap-[80px] whitespace-nowrap text-[32px] leading-[1.35]',
        className,
      )}
    >
      <div className="flex gap-[24px]">
        <dt className="sr-only">Date and time</dt>
        <IconCalendar className={iconClassName} />
        <dd>
          {formatDate(event.date)}
          <br />
          <span className={mutedClassName}>
            {event.startTime} – {event.endTime}
          </span>
        </dd>
      </div>
      <div className="flex gap-[24px]">
        <dt className="sr-only">Location</dt>
        <IconPin className={iconClassName} />
        <dd>
          {getVenueName(event)}
          <br />
          <span className={mutedClassName}>
            {event.venue.address}, {event.venue.city}
          </span>
          {event.venue.name && (
            <>
              <br />
              <span className={mutedClassName}>Hosted by {event.host}</span>
            </>
          )}
        </dd>
      </div>
    </dl>
  )
}

// The key points of the meetup, short enough for a slide
const aboutPoints = [
  { title: 'Community', text: 'Developers, engineers and tech enthusiasts' },
  { title: 'Knowledge', text: 'Insights, best practices and new technologies' },
  { title: 'Every quarter', text: 'Two talks, drinks and snacks' },
  { title: 'Different every time', text: 'Changing locations and speakers' },
]

function AboutSlide({ event }: { event: Event }) {
  return (
    <Slide
      episode={event.episode}
      tone="white"
      className="grid grid-cols-2 items-center gap-[120px]"
    >
      <div className={`flex flex-col gap-[40px] ${enter}`}>
        <SlideLabel>About us</SlideLabel>
        <h2 className="text-balance text-[96px] leading-none tracking-[-0.03em]">
          A group of tech lovers
        </h2>
        <p className="text-balance text-[40px] leading-snug text-slate">
          Bringing the tech community of South Tyrol together
        </p>
      </div>
      <ul
        className={`flex flex-col divide-y divide-navy/10 border-y border-navy/10 ${enterLate}`}
      >
        {aboutPoints.map((point) => (
          <li key={point.title} className="flex flex-col gap-[4px] py-[32px]">
            <h3 className="text-[44px] font-semibold leading-tight">
              {point.title}
            </h3>
            <p className="text-[32px] text-slate">{point.text}</p>
          </li>
        ))}
      </ul>
    </Slide>
  )
}

function AgendaSlide({ event }: { event: Event }) {
  // The detail shows on the same line as the title, the content below it
  const items: { title: string; detail?: string; content?: ReactNode }[] = [
    {
      title: 'Welcome and introduction',
      detail: event.startTime,
    },
    {
      title: 'Presenting the host',
      detail: event.host,
    },
    {
      title: event.talks.length === 1 ? 'Talk' : 'Talks',
      content: (
        <ul className="flex flex-col gap-[10px]">
          {event.talks.map((talk, index) => (
            <li key={talk.title} className="flex gap-[32px]">
              <span className="w-[112px] shrink-0 tabular-nums">
                {formatTalkTime(event.startTime, index)}
              </span>
              <span className="flex flex-col">
                <span className="font-semibold text-navy">{talk.title}</span>
                {formatSpeakerNames(talk.speakers.map((s) => s.name))}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Closing remarks',
      detail: 'Get involved and next event',
    },
    {
      title: 'Networking',
      detail: 'Drinks and snacks',
    },
  ]

  return (
    <Slide episode={event.episode} tone="white" className="gap-[40px]">
      <h2 className={`text-[80px] leading-none tracking-[-0.03em] ${enter}`}>
        Agenda
      </h2>
      <ol className={`flex flex-col gap-[20px] ${enterLate}`}>
        {items.map((item, index) => (
          <li key={item.title} className="flex gap-[40px]">
            <span className="flex size-[64px] shrink-0 items-center justify-center rounded-full bg-navy text-[28px] font-semibold text-white">
              {index + 1}
            </span>
            <div className="flex flex-1 flex-col gap-[12px] pt-[4px]">
              <div className="flex items-baseline gap-[24px]">
                <h3 className="text-[40px] font-semibold leading-tight">
                  {item.title}
                </h3>
                {item.detail && (
                  <span className="text-[32px] text-slate">{item.detail}</span>
                )}
              </div>
              {item.content && (
                <div className="text-[28px] leading-snug text-slate">
                  {item.content}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Slide>
  )
}

/**
 * The website of the host without "https://" and "www.", for example "konverto.eu".
 */
function formatHostWebsite(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

function HostSlide({ event }: { event: Event }) {
  return (
    <Slide
      episode={event.episode}
      tone="navy"
      brace
      className="justify-center gap-[56px]"
    >
      <SlideLabel tone="navy" className={enter}>
        Our host tonight
      </SlideLabel>
      <h2
        className={`text-[160px] font-normal leading-[0.95] tracking-[-0.04em] ${enterLate}`}
      >
        {event.host}
      </h2>
      {event.hostUrl && (
        <p className={`text-[40px] text-slate-muted ${enterLater}`}>
          {formatHostWebsite(event.hostUrl)}
        </p>
      )}
    </Slide>
  )
}

function TalkSlide({ event, number }: { event: Event; number: number }) {
  const index = number - 1
  const talk = event.talks[index]

  // lib/slides.ts already checks the number with a clearer error message
  if (talk === undefined) {
    throw new Error(`Talk ${number} not found in ${event.slug}`)
  }

  return (
    <Slide
      episode={event.episode}
      tone="white"
      className="justify-between gap-[64px]"
    >
      <div className={`flex flex-col gap-[48px] ${enter}`}>
        <SlideLabel>
          {event.talks.length > 1 ? `Talk ${number}` : 'Talk'} ·{' '}
          {formatTalkTime(event.startTime, index)}
        </SlideLabel>
        <h2 className="max-w-[1500px] text-[96px] font-semibold leading-[1.05] tracking-[-0.03em]">
          {talk.title}
        </h2>
      </div>
      <ul className={`flex flex-wrap gap-x-[96px] gap-y-[48px] ${enterLate}`}>
        {talk.speakers.map((speaker) => (
          <li key={speaker.name} className="flex items-center gap-[40px]">
            <SpeakerPhoto speaker={speaker} />
            <div className="flex flex-col gap-[8px]">
              <span className="text-[48px] font-semibold leading-tight">
                {speaker.name}
              </span>
              {(Boolean(speaker.role) || Boolean(speaker.company)) && (
                <span className="text-[32px] text-slate">
                  {speaker.role}
                  {speaker.role && speaker.company && ' · '}
                  {speaker.company}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Slide>
  )
}

function SpeakerPhoto({ speaker }: { speaker: Speaker }) {
  return (
    <div className="relative flex size-[200px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy text-[64px] font-semibold tracking-tight text-white">
      {speaker.image ? (
        <Image
          src={speaker.image}
          alt=""
          fill
          sizes="200px"
          // The slides are hidden until they show, so the browser must not wait with the download
          loading="eager"
          className="object-cover grayscale"
        />
      ) : (
        <span aria-hidden="true">
          <span className="font-normal text-sky">{'{'}</span>
          {formatInitials(speaker.name)}
          <span className="font-normal text-sky">{'}'}</span>
        </span>
      )}
    </div>
  )
}

function NextEventSlide({
  event,
  nextEvent,
}: {
  event: Event
  nextEvent: Event | null
}) {
  return (
    <Slide
      episode={event.episode}
      tone="white"
      className="grid grid-cols-2 items-center gap-[120px]"
    >
      <div className="flex flex-col gap-[48px]">
        <SlideLabel className={enter}>Next event</SlideLabel>
        <h2
          className={`text-[160px] font-normal leading-[0.95] tracking-[-0.04em] ${enterLate}`}
        >
          Episode {event.episode + 1}
        </h2>
        {!nextEvent && (
          <p className={`text-[48px] leading-tight ${enterLater}`}>
            Coming soon.
          </p>
        )}
      </div>
      {nextEvent ? (
        <div className={`flex flex-col gap-[56px] ${enterLater}`}>
          {nextEvent.talks.length > 0 && (
            <ul className="flex flex-col gap-[24px] text-[36px] leading-snug">
              {nextEvent.talks.map((talk) => (
                <li key={talk.title}>
                  <span className="font-semibold">{talk.title}</span>
                  <br />
                  <span className="text-slate">
                    {formatSpeakerNames(talk.speakers.map((s) => s.name))}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <EventFacts
            event={nextEvent}
            tone="light"
            className="flex-col !gap-[32px]"
          />
        </div>
      ) : (
        <div className={`flex flex-col gap-[32px] ${enterLater}`}>
          <p className="text-[36px] text-slate">
            Follow us, so that you do not miss the date:
          </p>
          <ChannelList />
        </div>
      )}
    </Slide>
  )
}

const channels = [
  { label: 'Newsletter', detail: site.website, Icon: IconGlobe },
  { label: 'LinkedIn', detail: site.linkedInName, Icon: IconLinkedIn },
  { label: 'X', detail: site.twitterHandle, Icon: IconX },
  { label: 'Discord', detail: 'Join the community', Icon: IconDiscord },
]

/**
 * The channels as a list of rows with lines between them.
 */
function ChannelList() {
  return (
    <ul className="flex flex-col divide-y divide-navy/10 border-y border-navy/10">
      {channels.map(({ label, detail, Icon }) => (
        <li key={label} className="flex items-center gap-[32px] py-[28px]">
          <span className="flex size-[72px] shrink-0 items-center justify-center rounded-full bg-navy text-white">
            <Icon className="size-[32px]" />
          </span>
          <span className="text-[36px] font-semibold">{label}</span>
          <span className="ml-auto text-[30px] text-slate">{detail}</span>
        </li>
      ))}
    </ul>
  )
}

// The ways to take part, short enough for a slide
const getInvolvedOptions = [
  {
    title: 'Give a talk',
    text: 'Share your experience with the community',
  },
  {
    title: 'Host a meetup',
    text: 'Welcome the community in your rooms',
  },
]

function GetInvolvedSlide({ event }: { event: Event }) {
  return (
    <Slide
      episode={event.episode}
      tone="white"
      className="grid grid-cols-[1fr_1.2fr] items-center gap-[120px]"
    >
      <div className="flex flex-col gap-[72px]">
        <div className={`flex flex-col gap-[40px] ${enter}`}>
          <SlideLabel>Get involved</SlideLabel>
          <h2 className="text-[96px] leading-none tracking-[-0.03em]">
            Make the next episode
          </h2>
        </div>
        <p className={`flex flex-col gap-[8px] ${enterLate}`}>
          <span className="text-[28px] text-slate">Write us an email</span>
          <span className="flex items-center gap-[16px] text-[40px] font-semibold">
            <IconMail className="size-[40px]" />
            {site.email}
          </span>
        </p>
      </div>
      <ul
        className={`flex flex-col divide-y divide-navy/10 border-y border-navy/10 ${enterLater}`}
      >
        {getInvolvedOptions.map((option) => (
          <li key={option.title} className="flex flex-col gap-[4px] py-[32px]">
            <h3 className="text-[44px] font-semibold leading-tight">
              {option.title}
            </h3>
            <p className="text-[32px] text-slate">{option.text}</p>
          </li>
        ))}
      </ul>
    </Slide>
  )
}

function CustomSlide({
  event,
  slide,
}: {
  event: Event
  slide: Extract<SlideConfig, { type: 'custom' }>
}) {
  const tone = slide.tone ?? 'white'

  return (
    <Slide episode={event.episode} tone={tone} className="gap-[64px]">
      {(Boolean(slide.label) || Boolean(slide.title)) && (
        <div className={`flex flex-col gap-[40px] ${enter}`}>
          {slide.label && <SlideLabel tone={tone}>{slide.label}</SlideLabel>}
          {slide.title && (
            <h2 className="text-[96px] leading-none tracking-[-0.03em]">
              {slide.title}
            </h2>
          )}
        </div>
      )}
      {slide.content && (
        <Markdown
          className={`min-h-0 flex-1 !space-y-[32px] text-[40px] leading-snug [&_h2]:text-[56px] [&_h3]:text-[48px] [&_img]:max-h-[560px] [&_img]:rounded-[32px] [&_ol]:!space-y-[16px] [&_ol]:!pl-[56px] [&_ul]:!space-y-[16px] [&_ul]:!pl-[56px] ${
            tone === 'navy' ? '[&_h3]:!text-white' : ''
          } ${enterLate}`}
        >
          {slide.content}
        </Markdown>
      )}
    </Slide>
  )
}
