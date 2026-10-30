import classNames from 'classnames'
import { FormEvent, ReactNode, useId, useState } from 'react'

type SubscribeFormProps = {
  // The event for which the person registers. Without it, the person only
  // subscribes to the newsletter.
  slug?: string
  // The colors of the background on which the form is
  tone?: 'light' | 'dark'
  submitLabel: ReactNode
  onSuccess?: () => void
  className?: string
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export function SubscribeForm({
  slug,
  tone = 'light',
  submitLabel,
  onSuccess,
  className,
}: SubscribeFormProps) {
  const id = useId()
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault()
    const data = new FormData(formEvent.currentTarget)
    setStatus('sending')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          website: data.get('website'),
          slug,
        }),
      })

      if (!response.ok) {
        throw new Error(`Subscription failed with status ${response.status}`)
      }

      setStatus('success')
      onSuccess?.()
    } catch {
      setStatus('error')
    }
  }

  const isDark = tone === 'dark'

  if (status === 'success') {
    return (
      <p
        role="status"
        className={classNames(
          'text-md',
          isDark ? 'text-white' : 'text-navy',
          className,
        )}
      >
        Thank you! Please confirm your subscription with the link in the email
        that we sent you.
      </p>
    )
  }

  return (
    <form
      onSubmit={(formEvent) => void handleSubmit(formEvent)}
      className={classNames('flex w-full max-w-lg flex-col gap-3', className)}
    >
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          className={classNames(
            'min-w-0 flex-1 rounded-full px-6 py-3 text-base outline-none ring-1 focus-visible:ring-2',
            isDark
              ? 'bg-white/10 text-white ring-white/40 placeholder:text-slate-muted focus-visible:ring-white'
              : 'bg-white text-navy ring-navy/30 placeholder:text-slate-light focus-visible:ring-navy',
          )}
        />
        {/* Hidden from people. Spam bots fill it in. */}
        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className={classNames(
            'inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:opacity-60',
            isDark
              ? 'bg-white text-navy hover:bg-cream'
              : 'bg-navy text-white hover:bg-slate',
          )}
        >
          {submitLabel}
        </button>
      </div>
      {status === 'error' && (
        <p
          role="alert"
          className={classNames('text-sm', isDark ? 'text-blush' : 'text-navy')}
        >
          Something went wrong. Please try again, or write us an email.
        </p>
      )}
      <p
        className={classNames(
          'text-sm',
          isDark ? 'text-slate-muted' : 'text-navy/70',
        )}
      >
        You can unsubscribe at any time with the link in each email.
      </p>
    </form>
  )
}
