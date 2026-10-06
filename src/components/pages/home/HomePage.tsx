import { Event } from '../../../lib/types'
import { Layout } from '../../layout/Layout'
import { Meta } from '../../layout/Meta'
import { About } from './About'
import { GetInvolved } from './GetInvolved'
import { Hero } from './Hero'
import { NextEvent } from './NextEvent'
import { PastEvents } from './PastEvents'
import { Team } from './Team'

export type HomePageProps = {
  nextEvent: Event | null
  nextEpisode: number
  recentEvents: Event[]
  stats: {
    episodes: number
    talks: number
    speakers: number
    cities: number
  }
}

export function HomePage({
  nextEvent,
  nextEpisode,
  recentEvents,
  stats,
}: HomePageProps) {
  return (
    <Layout>
      <Meta />
      <Hero />
      <About stats={stats} />
      <NextEvent event={nextEvent} nextEpisode={nextEpisode} />
      <PastEvents events={recentEvents} />
      <Team />
      <GetInvolved />
    </Layout>
  )
}
