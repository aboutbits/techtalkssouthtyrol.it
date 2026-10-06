import { site } from '../../../data/site'
import { IconDiscord } from '../../icons/Icons'
import { ButtonLink } from '../../shared/Button'
import { Section, SectionHeader } from '../../shared/Section'

const channels = [
  {
    name: 'daily-insights',
    text: 'Articles, tools and learnings that we find on the job. Short, practical and shared every day.',
  },
  {
    name: 'ask-the-community',
    text: 'Stuck with a problem? Ask the developers, engineers and designers of South Tyrol.',
  },
  {
    name: 'meetups',
    text: 'News about the next episodes, the speakers and the talks before everybody else.',
  },
]

export function Community() {
  return (
    <Section id="community" tone="white">
      <SectionHeader label="Community" title="Between the meetups">
        <ButtonLink href={site.discordUrl} variant="dark" external>
          <IconDiscord className="size-5" />
          Join us on Discord
        </ButtonLink>
      </SectionHeader>
      <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="flex flex-col gap-6 text-md text-navy/80">
          <p className="text-xl text-navy">
            A meetup happens four times a year. Tech happens every day.
          </p>
          <p>
            On our Discord server, the tech community of South Tyrol shares
            insights every day. Post what you learn, ask questions and continue
            the discussions from the last meetup.
          </p>
          <p>
            To keep the community a friendly place, we approve each request to
            join by hand. Tell us a few words about yourself and we let you in.
          </p>
        </div>
        <ul className="bg-pastel flex flex-col gap-4 rounded-3xl p-4 md:p-6">
          {channels.map((channel) => (
            <li
              key={channel.name}
              className="flex flex-col gap-2 rounded-2xl bg-white/70 p-5 backdrop-blur md:p-6"
            >
              <span className="text-lg font-semibold">
                <span aria-hidden="true" className="text-slate">
                  #{' '}
                </span>
                {channel.name}
              </span>
              <p className="text-md text-navy/80">{channel.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
