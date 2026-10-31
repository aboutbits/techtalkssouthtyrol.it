export type SpeakerSocial = {
  x?: string
  linkedin?: string
  github?: string
  mastodon?: string
  bluesky?: string
  website?: string
}

export type Speaker = {
  name: string
  role?: string
  company?: string
  companyUrl?: string
  image?: string
  social?: SpeakerSocial
}

export type Talk = {
  title: string
  speakers: Speaker[]
  abstract: string
  slides?: string
  recording?: string
}

export type Venue = {
  // Only when the event does not take place at the host
  name?: string
  address: string
  city: string
}

/**
 * A slide of the presentation at /events/<slug>/slides.
 * The front matter can use the short form, for example "title" instead of
 * "{ type: 'title' }".
 */
export type SlideConfig =
  | { type: 'title' }
  | { type: 'about' }
  | { type: 'agenda' }
  | { type: 'host' }
  // The number of the talk, starting with 1
  | { type: 'talk'; talk: number }
  | { type: 'next-event' }
  | { type: 'get-involved' }
  | {
      type: 'custom'
      label?: string
      title?: string
      subtitle?: string
      // Short points on the right side of the slide, with the heading on the left
      points?: { title: string; text?: string }[]
      // Markdown, below the heading. Not shown if the slide has points.
      content?: string
      tone?: 'navy' | 'white' | 'pastel'
    }

export type EventMeta = {
  episode: number
  date: string
  startTime: string
  endTime: string
  host: string
  hostUrl?: string
  venue: Venue
  talks: Talk[]
  // The slides of the presentation. Without it, the default slides are used.
  presentation?: (SlideConfig | SlideConfig['type'])[]
}

export type Event = EventMeta & {
  slug: string
  notes: string
}
