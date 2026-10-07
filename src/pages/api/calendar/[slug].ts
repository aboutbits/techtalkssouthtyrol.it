import { buildEventCalendar } from '../../../lib/calendar'
import { getEvent, getEventSlugs } from '../../../lib/events'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * The calendar file (.ics) of an event, for "I will attend" on the event page.
 */
export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const slug = request.query.slug

  if (typeof slug !== 'string' || !getEventSlugs().includes(slug)) {
    response.status(404).end()
    return
  }

  const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000'

  response.setHeader('Content-Type', 'text/calendar; charset=utf-8')
  response.setHeader(
    'Content-Disposition',
    `attachment; filename="tech-talks-south-tyrol-${slug}.ics"`,
  )
  response.setHeader('Cache-Control', 'public, max-age=3600')
  response.send(buildEventCalendar(getEvent(slug), baseUrl))
}
