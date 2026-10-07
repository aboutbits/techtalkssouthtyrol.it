export type SpeakerSocial = {
  x?: string
  linkedin?: string
  github?: string
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
  name: string
  address: string
  city: string
}

export type EventMeta = {
  episode: number
  date: string
  startTime: string
  endTime: string
  host: string
  venue: Venue
  talks: Talk[]
}

export type Event = EventMeta & {
  slug: string
  notes: string
}
