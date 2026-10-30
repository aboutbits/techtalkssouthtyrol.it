import { subscribe } from '../../lib/buttondown'
import { getEvent, getEventSlugs } from '../../lib/events'
import type { NextApiRequest, NextApiResponse } from 'next'

type Body = {
  email?: unknown
  // The event for which the person registers, see "I will attend"
  slug?: unknown
  // A hidden field. People leave it empty, spam bots fill it in.
  website?: unknown
}

// A simple check only. Buttondown validates the address again.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Adds a person to the newsletter. With an event, the subscriber gets the tag
 * of the episode, for example "episode-15".
 */
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    response.status(405).end()
    return
  }

  const { email, slug, website } = (request.body ?? {}) as Body

  // Tell the bot that everything is fine, but do nothing.
  if (typeof website === 'string' && website !== '') {
    response.status(200).json({ ok: true })
    return
  }

  if (typeof email !== 'string' || !emailPattern.test(email.trim())) {
    response.status(400).json({ error: 'invalid_email' })
    return
  }

  if (
    slug !== undefined &&
    (typeof slug !== 'string' || !getEventSlugs().includes(slug))
  ) {
    response.status(400).json({ error: 'invalid_event' })
    return
  }

  const tags =
    typeof slug === 'string' ? [`episode-${getEvent(slug).episode}`] : []

  try {
    await subscribe(email.trim(), {
      tags,
      ipAddress: getIpAddress(request),
      referrerUrl: request.headers.referer,
    })
  } catch (error) {
    console.error(error)
    response.status(502).json({ error: 'subscription_failed' })
    return
  }

  response.status(200).json({ ok: true })
}

function getIpAddress(request: NextApiRequest) {
  const forwardedFor = request.headers['x-forwarded-for']
  const value = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor

  return value?.split(',')[0]?.trim() ?? request.socket.remoteAddress
}
