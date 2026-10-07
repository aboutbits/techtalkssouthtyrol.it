import Image from 'next/image'
import { ComponentType } from 'react'
import { formatInitials } from '../../lib/format'
import { Speaker, SpeakerSocial, Talk } from '../../lib/types'
import {
  IconGitHub,
  IconGlobe,
  IconLinkedIn,
  IconPlay,
  IconSlides,
  IconX,
} from '../icons/Icons'
import { ButtonLink } from '../shared/Button'
import { Markdown } from '../shared/Markdown'

const socialLinks: {
  key: keyof SpeakerSocial
  label: string
  Icon: ComponentType<{ className?: string }>
}[] = [
  { key: 'x', label: 'X', Icon: IconX },
  { key: 'linkedin', label: 'LinkedIn', Icon: IconLinkedIn },
  { key: 'github', label: 'GitHub', Icon: IconGitHub },
  { key: 'website', label: 'Website', Icon: IconGlobe },
]

export function TalkDetails({ talk }: { talk: Talk }) {
  return (
    <article className="grid gap-x-10 gap-y-6 py-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:py-14">
      <h3 className="text-h3 font-semibold lg:col-span-8 lg:row-start-1">
        {talk.title}
      </h3>

      <ul className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1">
        {talk.speakers.map((speaker) => (
          <li key={speaker.name}>
            <SpeakerProfile speaker={speaker} />
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-8 lg:col-span-8 lg:row-start-2">
        {talk.abstract && (
          <Markdown className="text-md text-navy/80">{talk.abstract}</Markdown>
        )}

        {(Boolean(talk.slides) || Boolean(talk.recording)) && (
          <div className="flex flex-wrap gap-3">
            {talk.slides && (
              <ButtonLink href={talk.slides} variant="dark" external>
                <IconSlides className="size-5" />
                View slides
              </ButtonLink>
            )}
            {talk.recording && (
              <ButtonLink href={talk.recording} variant="outline-dark" external>
                <IconPlay className="size-5" />
                Watch recording
              </ButtonLink>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

function SpeakerProfile({ speaker }: { speaker: Speaker }) {
  const links = socialLinks.filter(({ key }) => speaker.social?.[key])

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy text-lg font-semibold tracking-tight text-white">
        {speaker.image ? (
          <Image
            src={speaker.image}
            alt=""
            fill
            sizes="4rem"
            className="object-cover"
          />
        ) : (
          <span aria-hidden="true">
            <span className="font-normal text-sky">{'{'}</span>
            {formatInitials(speaker.name)}
            <span className="font-normal text-sky">{'}'}</span>
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{speaker.name}</span>
        {(Boolean(speaker.role) || Boolean(speaker.company)) && (
          <span className="text-sm text-slate">
            {speaker.role}
            {speaker.role && speaker.company && ' · '}
            {speaker.company &&
              (speaker.companyUrl ? (
                <a
                  href={speaker.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-navy"
                >
                  {speaker.company}
                </a>
              ) : (
                speaker.company
              ))}
          </span>
        )}
        {links.length > 0 && (
          <ul className="flex gap-3 pt-1">
            {links.map(({ key, label, Icon }) => (
              <li key={key}>
                <a
                  href={speaker.social?.[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${speaker.name} on ${label}`}
                  className="text-slate-light transition-colors hover:text-navy"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
