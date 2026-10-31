import classNames from 'classnames'
import Image from 'next/image'
import { site } from '../../data/site'
import {
  addMinutes,
  formatDate,
  formatInitials,
  formatSpeakerNames,
  formatTalkTime,
  getVenueName,
} from '../../lib/format'
import { Event, SlideConfig, Speaker, Talk } from '../../lib/types'
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
import { Slide, SlideHeading, SlideLabel } from './Slide'

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
      <SlideHeading
        label="About us"
        title="A group of tech lovers"
        subtitle="Bringing the tech community of South Tyrol together"
        className={enter}
      />
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

/**
 * The job title and the company of a speaker, for example "Co-Founder · Evopilot".
 */
function formatSpeakerJob(speaker: Speaker) {
  return [speaker.role, speaker.company].filter(Boolean).join(' · ')
}

/**
 * The name, the job title and the company of a speaker.
 */
function SpeakerName({ speaker }: { speaker: Speaker }) {
  return (
    <span className="flex flex-col">
      <span className="text-[24px] font-semibold leading-tight">
        {speaker.name}
      </span>
      {formatSpeakerJob(speaker) && (
        <span className="text-[22px] leading-tight text-slate">
          {formatSpeakerJob(speaker)}
        </span>
      )}
    </span>
  )
}

/**
 * A talk with its title, its start time and a chip for each speaker.
 */
function TalkCard({ talk, time }: { talk: Talk; time: string }) {
  return (
    <li className="flex flex-col gap-[16px] rounded-[32px] bg-navy/5 p-[28px]">
      <div className="flex items-start justify-between gap-[24px]">
        <span className="text-[30px] font-semibold leading-tight">
          {talk.title}
        </span>
        <span className="shrink-0 rounded-full bg-navy px-[20px] py-[6px] text-[24px] font-semibold tabular-nums text-white">
          {time}
        </span>
      </div>
      <ul className="flex flex-wrap gap-x-[32px] gap-y-[12px]">
        {talk.speakers.map((speaker) => (
          <li key={speaker.name} className="flex items-center gap-[16px]">
            <SpeakerPhoto speaker={speaker} size={64} />
            <SpeakerName speaker={speaker} />
          </li>
        ))}
      </ul>
    </li>
  )
}

/**
 * The program of the evening as a timeline on the left, the talks with the
 * speakers on the right.
 */
function AgendaSlide({ event }: { event: Event }) {
  // The host speaks 5 minutes after the start, the closing remarks follow the
  // time slot of the last talk, and the networking starts 5 minutes later.
  const closingTime = formatTalkTime(event.startTime, event.talks.length)
  const program: { time: string; title: string; detail?: string }[] = [
    { time: event.startTime, title: 'Welcome and introduction' },
    {
      time: addMinutes(event.startTime, 5),
      title: 'Presenting the host',
      detail: event.host,
    },
    {
      time: formatTalkTime(event.startTime, 0),
      title: event.talks.length === 1 ? 'Talk' : 'Talks',
    },
    { time: closingTime, title: 'Closing remarks' },
    {
      time: addMinutes(closingTime, 5),
      title: 'Networking',
      detail: 'Drinks and snacks',
    },
  ]

  return (
    <Slide
      episode={event.episode}
      tone="white"
      className="grid grid-cols-[1fr_1.4fr] items-center gap-[96px]"
    >
      <div className={`flex flex-col gap-[48px] ${enter}`}>
        <SlideLabel>Agenda</SlideLabel>
        <ol className="flex flex-col gap-[24px]">
          {program.map((item, index) => (
            <li key={item.title} className="flex items-center gap-[28px]">
              <span className="flex shrink-0 items-center gap-[20px] self-stretch">
                <span className="w-[88px] text-right text-[28px] font-semibold tabular-nums">
                  {item.time}
                </span>
                <span className="relative flex w-[20px] justify-center self-stretch">
                  {/* The line to the dot of the next item */}
                  {index < program.length - 1 && (
                    <span className="absolute left-1/2 top-1/2 h-[calc(100%+24px)] w-[3px] -translate-x-1/2 bg-navy/30" />
                  )}
                  <span className="relative my-auto size-[20px] rounded-full bg-navy" />
                </span>
              </span>
              <span className="flex flex-col">
                <span className="text-[36px] font-semibold leading-tight">
                  {item.title}
                </span>
                {item.detail && (
                  <span className="text-[26px] text-slate">{item.detail}</span>
                )}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <ul className={`flex flex-col gap-[24px] ${enterLate}`}>
        {event.talks.map((talk, index) => (
          <TalkCard
            key={talk.title}
            talk={talk}
            time={formatTalkTime(event.startTime, index)}
          />
        ))}
      </ul>
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

function SpeakerPhoto({
  speaker,
  size = 200,
}: {
  speaker: Speaker
  // The width and the height in pixels
  size?: number
}) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy font-semibold tracking-tight text-white ring-[6px] ring-white"
      style={{ width: size, height: size, fontSize: size * 0.32 }}
    >
      {speaker.image ? (
        <Image
          src={speaker.image}
          alt=""
          fill
          sizes={`${size}px`}
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
      <SlideHeading
        label="Next event"
        title={`Episode ${event.episode + 1}`}
        subtitle={nextEvent ? undefined : 'Coming soon'}
        className={enter}
      />
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
        <SlideHeading
          label="Get involved"
          title="Make the next episode"
          className={enter}
        />
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
        <SlideHeading
          label={slide.label}
          title={slide.title}
          tone={tone}
          className={enter}
        />
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
