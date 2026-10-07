import { formatSpeakerNames } from './format'
import { Event } from './types'

/**
 * The path of the Open Graph image of an event, see pages/api/og-event.tsx.
 * The image route runs on the edge and cannot read the event files, so the
 * path contains all data that the image shows. A change of the data also
 * changes the path, so no cached image stays out of date.
 */
export function eventOgImagePath(event: Event) {
  const params = new URLSearchParams({
    episode: String(event.episode),
    date: event.date,
    city: event.venue.city,
  })

  event.talks.forEach((talk) => {
    params.append('talk', talk.title)
    params.append(
      'speakers',
      formatSpeakerNames(talk.speakers.map((speaker) => speaker.name)),
    )
  })

  return `/api/og-event?${params.toString()}`
}
