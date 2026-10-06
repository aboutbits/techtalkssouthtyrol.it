import { Section, SectionHeader } from '../../shared/Section'
import { Fact, FactGrid, NotesPage } from './Notes'

const evening = [
  {
    time: 'Start',
    title: 'Your company on stage',
    text: 'At the start of each meetup, the host can present the company to the audience for approximately 5 minutes. Tell the community who you are and what you work on.',
  },
  {
    time: 'Main part',
    title: 'The talks',
    text: 'The speakers give their talks. Each talk takes 25 to 30 minutes, followed by 5 to 10 minutes for questions and discussion.',
  },
  {
    time: 'End',
    title: 'Drinks and snacks',
    text: 'After the talks, the attendees stay to talk with each other. We ask the host to supply some drinks and snacks for this part of the evening.',
  },
]

const facts: Fact[] = [
  {
    label: 'Screen',
    value: 'TV or projector',
    text: 'The room needs a TV or a projector with an HDMI connection, so that the speakers can show their slides.',
  },
  {
    label: 'Presentation',
    value: '≈ 5 minutes',
    text: 'At the start of the meetup, you have approximately 5 minutes to present your company.',
  },
  {
    label: 'Catering',
    value: 'Drinks & snacks',
    text: 'At the end of the meetup, some drinks and snacks for the attendees make the evening complete.',
  },
]

export function HostNotesPage() {
  return (
    <NotesPage
      label="Host notes"
      title="Host a meetup"
      intro="Thank you for opening your doors to the tech community of South Tyrol. This page tells you what a host supplies and how the evening runs."
      description="What you need to know to host a Tech Talks South Tyrol meetup: the equipment, the host presentation, drinks and snacks, and the content guidelines."
      path="/host-notes"
    >
      <Section>
        <SectionHeader label="What you need" title="The checklist" />
        <FactGrid facts={facts} />
      </Section>
      <Section tone="navy">
        <SectionHeader label="The evening" tone="dark" title="How it runs" />
        <ol className="grid gap-6 md:grid-cols-3">
          {evening.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col gap-4 rounded-3xl bg-slate/40 p-6 md:p-8"
            >
              <span className="flex items-center gap-3 text-sm text-slate-muted">
                <span className="flex size-8 items-center justify-center rounded-full bg-white font-semibold text-navy">
                  {index + 1}
                </span>
                {step.time}
              </span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-md text-slate-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>
    </NotesPage>
  )
}
