import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Event, EventMeta } from './types'

const eventsDirectory = path.join(process.cwd(), 'src/data/events')

export function getEventSlugs(): string[] {
  return fs
    .readdirSync(eventsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}

export function getEvent(slug: string): Event {
  const fileContents = fs.readFileSync(
    path.join(eventsDirectory, `${slug}.md`),
    'utf8',
  )
  const document = matter(fileContents)
  const meta = document.data as EventMeta

  return {
    ...meta,
    talks: meta.talks.map((talk) => ({
      ...talk,
      abstract: talk.abstract.trim(),
      slides: talk.slides ?? '',
      recording: talk.recording ?? '',
    })),
    image: meta.image ?? '',
    attendees: meta.attendees ?? 0,
    slug,
    notes: document.content.trim(),
  }
}

/**
 * Returns all events, the newest first.
 */
export function getAllEvents(): Event[] {
  return getEventSlugs()
    .map((slug) => getEvent(slug))
    .sort((a, b) => b.episode - a.episode)
}

/**
 * How often the static pages that depend on the current date are built again.
 * Without it, an event stays upcoming until the next deploy.
 */
export const revalidateSeconds = 60 * 60

/**
 * Splits the events into upcoming and past events.
 * An event is upcoming until the end of the day on which it takes place.
 * The pages are static, so this check runs at build time and again on each
 * revalidation (see `revalidateSeconds`).
 */
export function splitEvents(events: Event[], now = new Date()) {
  const today = now.toLocaleDateString('sv-SE', { timeZone: 'Europe/Rome' })

  return {
    upcoming: events
      .filter((event) => event.date >= today)
      .sort((a, b) => a.episode - b.episode),
    past: events
      .filter((event) => event.date < today)
      .sort((a, b) => b.episode - a.episode),
  }
}
