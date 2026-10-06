import { Section, SectionHeader } from '../../shared/Section'
import { Fact, FactGrid, NotesPage } from './Notes'

const facts: Fact[] = [
  {
    label: 'Duration',
    value: '25 min',
    text: 'The talk takes 25 to 30 minutes. After the talk, there are 5 to 10 minutes for questions and discussion.',
  },
  {
    label: 'Language',
    value: 'English',
    text: 'All talks are in English, so that everybody in the audience can follow.',
  },
  {
    label: 'Audience',
    value: 'Developers & PMs',
    text: 'Most of the attendees are software developers and product managers.',
  },
  {
    label: 'Format',
    value: 'Your choice',
    text: 'Slides are not the only option. A live demo, live coding or a discussion are also welcome.',
  },
  {
    label: 'Screen',
    value: 'TV or projector',
    text: 'The room has a TV or a projector with an HDMI connection. Bring an adapter for your laptop if necessary.',
  },
]

const information = [
  {
    title: 'About you',
    items: [
      { name: 'Name' },
      { name: 'Job title' },
      {
        name: 'Biography',
        detail:
          'A short text about your professional background, your expertise and your important achievements.',
      },
      { name: 'Photo' },
      { name: 'Company name' },
      {
        name: 'Company logo',
        detail: 'An SVG file with white text on a transparent background.',
      },
      {
        name: 'Social media and links',
        detail: 'For example your website, LinkedIn, GitHub or X profile.',
      },
    ],
  },
  {
    title: 'About your talk',
    items: [
      { name: 'Title' },
      {
        name: 'Abstract',
        detail:
          '50 to 150 words. Tell the audience what the talk is about and what they will learn.',
      },
    ],
  },
]

export function SpeakerNotesPage() {
  return (
    <NotesPage
      label="Speaker notes"
      title="Give a talk"
      intro="Thank you for sharing your knowledge with the tech community of South Tyrol. This page tells you how a talk works and what information we need from you."
      description="What you need to know to give a talk at Tech Talks South Tyrol: duration, language, audience, format and the information we need from you."
      path="/speaker-notes"
    >
      <Section>
        <SectionHeader label="The talk" title="Key facts" />
        <FactGrid facts={facts} />
        <div className="mt-6 flex flex-col gap-2 rounded-3xl bg-cream p-6 md:p-8">
          <h3 className="text-xl font-semibold">Please keep to the time</h3>
          <p className="max-w-3xl text-md text-navy/80">
            Do not speak for longer than 30 minutes. Other talks follow yours,
            and the attendees want time to talk with each other at the end of
            the evening. Practice your talk with a timer before the meetup.
          </p>
        </div>
      </Section>
      <Section tone="navy">
        <SectionHeader
          label="What we need"
          tone="dark"
          title="Send us this information"
        >
          <p className="max-w-md text-md text-slate-muted">
            We use this information to announce your talk on the website and on
            social media.
          </p>
        </SectionHeader>
        <div className="grid gap-6 md:grid-cols-2">
          {information.map((group) => (
            <section
              key={group.title}
              className="flex flex-col gap-6 rounded-3xl bg-slate/40 p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold">{group.title}</h3>
              <ul className="flex flex-col divide-y divide-white/10">
                {group.items.map((item) => (
                  <li key={item.name} className="flex gap-4 py-3">
                    <span
                      className="mt-2 size-2 shrink-0 rounded-full bg-sky"
                      aria-hidden="true"
                    />
                    <span className="flex flex-col gap-1">
                      <span className="text-md font-semibold">{item.name}</span>
                      {item.detail !== undefined && (
                        <span className="text-base text-slate-muted">
                          {item.detail}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>
    </NotesPage>
  )
}
