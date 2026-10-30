import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { useState } from 'react'
import { trackEvent } from '../../lib/analytics'
import { formatDate, getVenueName } from '../../lib/format'
import { Event } from '../../lib/types'
import { IconCalendar, IconClose, IconMail, IconPin } from '../icons/Icons'
import { ButtonLink } from '../shared/Button'
import { SubscribeForm } from '../shared/SubscribeForm'

type AttendButtonProps = {
  event: Event
  variant?: 'light' | 'dark'
  // Where the button is, for the analytics
  source: string
  className?: string
}

/**
 * "I will attend": downloads the calendar file of the event and opens a
 * dialog, in which the person can subscribe to the newsletter.
 */
export function AttendButton({
  event,
  variant = 'light',
  source,
  className,
}: AttendButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const calendarPath = `/api/calendar/${event.slug}`

  return (
    <>
      <ButtonLink
        href={calendarPath}
        onClick={() => {
          trackEvent('Attending', {
            episode: String(event.episode),
            source,
          })
          setIsOpen(true)
        }}
        variant={variant}
        download
        className={className}
      >
        <IconCalendar className="size-5" />I will attend
      </ButtonLink>

      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-navy/70 transition-opacity duration-200 data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white text-navy shadow-xl transition duration-200 data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
              }}
              className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-navy/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-current"
            >
              <IconClose className="size-5" />
              <span className="sr-only">Close</span>
            </button>
            <div className="bg-pastel flex flex-col gap-4 p-6 md:p-10">
              <span className="self-start rounded-full bg-navy px-4 py-1.5 text-sm text-white">
                You are in
              </span>
              <DialogTitle className="pr-8 text-h3 font-semibold">
                See you on Episode {event.episode}!
              </DialogTitle>
              <dl className="flex flex-col gap-2 text-base">
                <div className="flex gap-3">
                  <dt className="sr-only">Date and time</dt>
                  <IconCalendar className="mt-0.5 size-5 shrink-0" />
                  <dd>
                    {formatDate(event.date)}, {event.startTime} –{' '}
                    {event.endTime}
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="sr-only">Location</dt>
                  <IconPin className="mt-0.5 size-5 shrink-0" />
                  <dd>
                    {getVenueName(event)}, {event.venue.city}
                  </dd>
                </div>
              </dl>
              <p className="text-sm text-navy/70">
                The calendar file downloads now.{' '}
                <a
                  href={calendarPath}
                  download
                  className="underline underline-offset-2"
                >
                  Download it again
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10">
              <p className="text-md">
                <strong>Never miss an episode.</strong> Get an email when we
                announce the next one.
              </p>
              <SubscribeForm
                slug={event.slug}
                submitLabel={
                  <>
                    <IconMail className="size-5" />
                    Subscribe
                  </>
                }
                onSuccess={() => {
                  trackEvent('Newsletter', { source: 'attend dialog' })
                }}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
