import { MouseEvent } from 'react'
import { site } from '../../data/site'
import { trackEvent } from '../../lib/analytics'
import { Event } from '../../lib/types'
import { IconCalendar } from '../icons/Icons'
import { buttonClasses } from '../shared/Button'

type AttendButtonProps = {
  event: Event
  variant?: 'light' | 'dark'
  // Where the button is, for the analytics
  source: string
  className?: string
}

// The longest time to wait for Plausible before the page changes
const trackingTimeoutMs = 1000

/**
 * "I will attend": sends the event "Attending" to Plausible, and then opens
 * the event on Meetup.com, where the person registers. Without the page of
 * the event, the button opens the group on Meetup.com.
 */
export function AttendButton({
  event,
  variant = 'light',
  source,
  className,
}: AttendButtonProps) {
  const url = event.meetupUrl ?? site.meetupUrl
  const props = { episode: String(event.episode), source }

  const handleClick = (clickEvent: MouseEvent<HTMLAnchorElement>) => {
    // A new tab or window does not leave this page, so there is no need to
    // wait for Plausible.
    if (
      clickEvent.button !== 0 ||
      clickEvent.metaKey ||
      clickEvent.ctrlKey ||
      clickEvent.shiftKey ||
      clickEvent.altKey
    ) {
      trackEvent('Attending', props)
      return
    }

    clickEvent.preventDefault()

    let isDone = false
    const openMeetup = () => {
      if (isDone) {
        return
      }

      isDone = true
      window.location.assign(url)
    }

    // If Plausible does not answer, open Meetup.com all the same.
    window.setTimeout(openMeetup, trackingTimeoutMs)
    trackEvent('Attending', props, openMeetup)
  }

  return (
    <a
      href={url}
      onClick={handleClick}
      className={buttonClasses(variant, className)}
    >
      <IconCalendar className="size-5" />I will attend
    </a>
  )
}
