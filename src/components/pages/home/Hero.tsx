import { useEffect } from 'react'
import { site } from '../../../data/site'
import { IconLinkedIn, IconMail, IconX } from '../../icons/Icons'
import { Brace } from '../../shared/Brace'
import { IconPillLink, Pill } from '../../shared/Pill'

/**
 * Keeps the height of the hero stable while the visitor scrolls.
 * Brave and Chrome on iOS resize the page when their toolbars show or hide,
 * so 100svh changes during the scroll and the content below the hero jumps.
 * The hook measures the window height once, and again only when the width
 * changes, for example when the phone rotates.
 */
function useStableViewportHeight() {
  useEffect(() => {
    let width = window.innerWidth

    const update = () => {
      document.documentElement.style.setProperty(
        '--hero-viewport-height',
        `${window.innerHeight}px`,
      )
    }

    const handleResize = () => {
      if (window.innerWidth !== width) {
        width = window.innerWidth
        update()
      }
    }

    update()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
}

export function Hero() {
  useStableViewportHeight()

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <Brace className="pointer-events-none absolute inset-y-0 right-0 aspect-[2/5] h-full max-w-16 md:max-w-[min(26vw,28rem)]" />
      <div className="relative mx-auto flex min-h-[min(calc(var(--hero-viewport-height,100svh)-4.25rem),56rem)] max-w-content flex-col justify-between gap-16 py-12 pl-4 pr-20 md:px-10 md:pr-[28vw] lg:py-18 xl:pr-[26rem]">
        <div className="flex flex-col items-start gap-10 lg:gap-14">
          <Pill className="text-lg motion-safe:animate-enter">Meetup</Pill>
          <h1 className="text-display font-normal motion-safe:animate-enter motion-safe:[animation-delay:100ms]">
            Tech Talks
            <br />
            South Tyrol
          </h1>
        </div>
        <div className="flex flex-col gap-10">
          <p className="max-w-2xl text-h3 font-normal motion-safe:animate-enter motion-safe:[animation-delay:250ms]">
            Your quarterly tech event to <strong>connect</strong>,{' '}
            <strong>share</strong> and <strong>discuss</strong>.
          </p>
          <ul className="flex flex-wrap gap-3 motion-safe:animate-enter motion-safe:[animation-delay:350ms]">
            <li>
              <IconPillLink
                href={`mailto:${site.email}`}
                icon={<IconMail className="size-5" />}
                label="E-Mail"
                detail={site.email}
              />
            </li>
            <li>
              <IconPillLink
                href={site.linkedInUrl}
                icon={<IconLinkedIn className="size-4" />}
                label="LinkedIn"
                detail={site.linkedInName}
                external
              />
            </li>
            <li>
              <IconPillLink
                href={site.twitterUrl}
                icon={<IconX className="size-4" />}
                label="X / Twitter"
                detail={site.twitterHandle}
                external
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
