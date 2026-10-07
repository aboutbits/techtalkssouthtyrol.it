import { site } from '../data/site'
import { formatSpeakerNames, formatTalkTime, getVenueName } from './format'
import { Event } from './types'

const timeZone = 'Europe/Rome'

/**
 * Converts a local date and time in South Tyrol to UTC.
 * The offset of Europe/Rome changes with daylight saving time, so it is
 * calculated for the given date.
 */
function toUtc(date: string, time: string) {
  const [year = 0, month = 1, day = 1] = date.split('-').map(Number)
  const [hours = 0, minutes = 0] = time.split(':').map(Number)
  const guess = Date.UTC(year, month - 1, day, hours, minutes)

  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
      .formatToParts(new Date(guess))
      .map((part) => [part.type, Number(part.value)]),
  )
  const local = Date.UTC(
    parts.year ?? 0,
    (parts.month ?? 1) - 1,
    parts.day ?? 1,
    parts.hour ?? 0,
    parts.minute ?? 0,
  )

  return new Date(guess - (local - guess))
}

function formatIcsDate(value: Date) {
  return value
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
}

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

/**
 * Lines must not be longer than 75 bytes. A longer line continues on the
 * next line, which starts with a space.
 */
function foldIcsLine(line: string) {
  const encoder = new TextEncoder()
  const lines: string[] = []
  let current = ''

  for (const char of line) {
    const limit = lines.length === 0 ? 75 : 74

    if (encoder.encode(current + char).length > limit) {
      lines.push(current)
      current = char
    } else {
      current += char
    }
  }
  lines.push(current)

  return lines.join('\r\n ')
}

/**
 * Returns the iCalendar file (.ics) of an event, which calendar apps can import.
 */
export function buildEventCalendar(event: Event, baseUrl: string) {
  const url = `${baseUrl}/events/${event.slug}`
  const schedule = [
    `${event.startTime} Welcome and introduction`,
    ...event.talks.map(
      (talk, index) =>
        `${formatTalkTime(event.startTime, index)} ${talk.title} (${formatSpeakerNames(talk.speakers.map((speaker) => speaker.name))})`,
    ),
    'Afterwards: networking, drinks and snacks',
  ]
  const description = [
    `Hosted by ${event.host}`,
    '',
    ...schedule,
    '',
    url,
  ].join('\n')

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${site.name}//Events//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.slug}@${site.website}`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(toUtc(event.date, event.startTime))}`,
    `DTEND:${formatIcsDate(toUtc(event.date, event.endTime))}`,
    `SUMMARY:${escapeIcsText(`${site.name} – Episode ${event.episode}`)}`,
    `LOCATION:${escapeIcsText(`${getVenueName(event)}, ${event.venue.address}, ${event.venue.city}`)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  return lines.map(foldIcsLine).join('\r\n') + '\r\n'
}
