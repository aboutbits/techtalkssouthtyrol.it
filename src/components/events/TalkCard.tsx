import { Talk } from '../../lib/types'
import { IconPlay, IconSlides } from '../icons/Icons'
import { ButtonLink } from '../shared/Button'
import { Markdown } from '../shared/Markdown'

type TalkCardProps = {
  talk: Talk
  showAbstract?: boolean
}

export function TalkCard({ talk, showAbstract = true }: TalkCardProps) {
  return (
    <article className="flex flex-col gap-6 rounded-3xl bg-white p-6 text-navy ring-1 ring-navy/10 md:p-10">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-slate">{talk.time}</span>
        <h3 className="text-h3 font-semibold">{talk.title}</h3>
      </div>

      <ul className="flex flex-wrap gap-3">
        {talk.speakers.map((speaker) => (
          <li
            key={speaker.name}
            className="bg-pastel flex flex-col rounded-2xl px-5 py-3"
          >
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
          </li>
        ))}
      </ul>

      {showAbstract && talk.abstract && (
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
    </article>
  )
}
