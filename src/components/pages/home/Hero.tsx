import { site } from '../../../data/site'
import { IconLinkedIn, IconMail, IconX } from '../../icons/Icons'
import { Brace } from '../../shared/Brace'
import { IconPillLink, Pill } from '../../shared/Pill'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <Brace className="pointer-events-none absolute inset-y-0 right-0 h-full w-16 md:w-[26vw] md:max-w-[28rem]" />
      <div className="relative mx-auto flex min-h-[min(calc(100svh-4.25rem),56rem)] max-w-content flex-col justify-between gap-16 py-12 pl-4 pr-20 md:px-10 md:pr-[28vw] lg:py-18 xl:pr-[26rem]">
        <div className="flex flex-col items-start gap-10 lg:gap-14">
          <Pill className="text-lg">Meetup</Pill>
          <h1 className="text-display font-normal">
            Tech Talks
            <br />
            South Tyrol
          </h1>
        </div>
        <div className="flex flex-col gap-10">
          <p className="max-w-2xl text-h3 font-normal">
            Your quarterly tech event to <strong>connect</strong>,{' '}
            <strong>share</strong> and <strong>discuss</strong>.
          </p>
          <ul className="flex flex-wrap gap-3">
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
