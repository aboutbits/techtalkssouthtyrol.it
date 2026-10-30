const apiUrl = 'https://api.buttondown.com/v1'

type SubscribeOptions = {
  // For example the episode for which the person registers
  tags?: string[]
  // The IP address of the person, so that the firewall of Buttondown checks
  // the person and not our server
  ipAddress?: string
  // The page on which the person subscribes
  referrerUrl?: string
}

type Subscriber = {
  id: string
  tags: string[]
}

export class ButtondownError extends Error {}

/**
 * Adds a person to the newsletter on Buttondown. Buttondown sends a
 * confirmation email (double opt-in) before the person gets the newsletter.
 *
 * If the person is already a subscriber, the tags are added to the
 * subscriber. The status of the subscriber does not change, so a person who
 * unsubscribed does not get the newsletter again.
 *
 * Needs the environment variable BUTTONDOWN_API_KEY.
 */
export async function subscribe(email: string, options: SubscribeOptions = {}) {
  const tags = options.tags ?? []

  let response = await createSubscriber(email, tags, options)

  // Plans without tags reject new tags. The subscription is more important
  // than the tag, so try again without it.
  if (response.status === 403 && tags.length > 0) {
    response = await createSubscriber(email, [], options)
  }

  if (response.ok) {
    return
  }

  // Buttondown rejects an email address that is already a subscriber.
  if (response.status === 400) {
    const subscriber = await getSubscriber(email)

    if (subscriber !== null) {
      await addTags(subscriber, tags)
      return
    }
  }

  throw new ButtondownError(
    `Buttondown rejected the subscriber (${response.status}): ${await response.text()}`,
  )
}

function createSubscriber(
  email: string,
  tags: string[],
  options: SubscribeOptions,
) {
  return request('/subscribers', {
    method: 'POST',
    body: JSON.stringify({
      email_address: email,
      tags,
      ip_address: options.ipAddress,
      referrer_url: options.referrerUrl,
    }),
  })
}

async function getSubscriber(email: string): Promise<Subscriber | null> {
  const response = await request(`/subscribers/${encodeURIComponent(email)}`)

  if (!response.ok) {
    return null
  }

  return (await response.json()) as Subscriber
}

async function addTags(subscriber: Subscriber, tags: string[]) {
  const newTags = tags.filter((tag) => !subscriber.tags.includes(tag))

  if (newTags.length === 0) {
    return
  }

  const response = await request(`/subscribers/${subscriber.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ tags: [...subscriber.tags, ...newTags] }),
  })

  // A missing tag is not a reason to fail, the person is a subscriber.
  if (!response.ok) {
    console.warn(
      `Buttondown did not add the tags (${response.status}): ${await response.text()}`,
    )
  }
}

function request(path: string, init: RequestInit = {}) {
  const apiKey = process.env.BUTTONDOWN_API_KEY

  if (!apiKey) {
    throw new ButtondownError(
      'The environment variable BUTTONDOWN_API_KEY is not set',
    )
  }

  return fetch(`${apiUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
  })
}
