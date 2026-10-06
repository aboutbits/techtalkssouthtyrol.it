import { site } from '../../../data/site'
import { IconMail } from '../../icons/Icons'
import { ButtonLink } from '../../shared/Button'
import { Section, SectionHeader } from '../../shared/Section'

const options = [
  {
    title: 'Give a talk',
    text: 'Would you like to give a presentation at one of our meetups? Share your experience with a project, a technology or a practice with the tech community in South Tyrol. Get in touch with one of our hosts or write us an email.',
    subject: 'I would like to give a talk',
    action: 'Submit a talk',
  },
  {
    title: 'Host a meetup',
    text: 'Would you like to host one of our meetups? Show your company or institution to the local tech community and welcome them in your rooms for an evening. Get in touch with one of our hosts or write us an email.',
    subject: 'We would like to host a meetup',
    action: 'Become a host',
  },
]

export function GetInvolved() {
  return (
    <Section id="get-involved" tone="pastel">
      <SectionHeader label="Get involved" title="Make the next episode" />
      <ul className="grid gap-6 md:grid-cols-2">
        {options.map((option) => (
          <li
            key={option.title}
            className="flex flex-col items-start gap-6 rounded-3xl bg-white/70 p-6 backdrop-blur md:p-10"
          >
            <h3 className="text-h3 font-semibold">{option.title}</h3>
            <p className="flex-1 text-md text-navy/80">{option.text}</p>
            <ButtonLink
              href={`mailto:${site.email}?subject=${encodeURIComponent(option.subject)}`}
              variant="dark"
            >
              <IconMail className="size-5" />
              {option.action}
            </ButtonLink>
          </li>
        ))}
      </ul>
    </Section>
  )
}
