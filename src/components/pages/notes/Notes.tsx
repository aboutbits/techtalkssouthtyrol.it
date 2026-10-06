import { ReactNode } from 'react'
import { site } from '../../../data/site'
import { IconMail } from '../../icons/Icons'
import { Layout } from '../../layout/Layout'
import { Meta } from '../../layout/Meta'
import { Brace } from '../../shared/Brace'
import { ButtonLink } from '../../shared/Button'
import { Pill } from '../../shared/Pill'
import { Section, SectionHeader } from '../../shared/Section'

type NotesPageProps = {
  label: string
  title: string
  intro: string
  description: string
  path: string
  children: ReactNode
}

/**
 * The frame of the host notes and the speaker notes: a navy hero with the
 * brace, the sections of the page and the content guidelines at the end.
 */
export function NotesPage({
  label,
  title,
  intro,
  description,
  path,
  children,
}: NotesPageProps) {
  return (
    <Layout>
      <Meta title={label} description={description} path={path} />
      <section className="relative overflow-hidden bg-navy text-white">
        <Brace className="pointer-events-none absolute inset-y-0 right-0 h-full w-12 md:w-48 lg:w-72" />
        <div className="relative mx-auto flex max-w-content flex-col items-start gap-8 py-18 pl-4 pr-16 md:px-10 md:pr-56 lg:py-24 lg:pr-80">
          <Pill>{label}</Pill>
          <h1 className="text-h1 font-normal tracking-tight">{title}</h1>
          <p className="max-w-2xl text-lg text-slate-muted">{intro}</p>
        </div>
      </section>
      {children}
      <ContentGuidelines />
    </Layout>
  )
}

export type Fact = {
  label: string
  value: string
  text: string
}

/**
 * A grid of key facts: a small label, a large value and a short explanation.
 */
export function FactGrid({ facts }: { facts: Fact[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {facts.map((fact) => (
        <li
          key={fact.label}
          className="flex flex-col gap-3 rounded-3xl bg-navy/5 p-6 md:p-8"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-light">
            {fact.label}
          </span>
          <span className="text-h3 font-semibold">{fact.value}</span>
          <p className="text-md text-navy/80">{fact.text}</p>
        </li>
      ))}
    </ul>
  )
}

const guidelines = [
  {
    title: 'No sales pitch',
    text: 'Do not use the talk to sell products or services. The audience comes to learn something, not to hear an advertisement.',
  },
  {
    title: 'No recruitment focus',
    text: 'The talk must not be a platform to hire new people. Do not use slides that focus on open positions or on hiring.',
  },
]

/**
 * The content guidelines are the same for hosts and for speakers.
 */
export function ContentGuidelines() {
  return (
    <Section tone="pastel">
      <SectionHeader label="Content guidelines" title="Share knowledge">
        <p className="max-w-md text-md text-navy/80">
          Tech Talks South Tyrol is a community meetup. These rules apply to all
          talks and to all host presentations.
        </p>
      </SectionHeader>
      <ul className="grid gap-6 md:grid-cols-2">
        {guidelines.map((guideline) => (
          <li
            key={guideline.title}
            className="flex flex-col gap-4 rounded-3xl bg-white/70 p-6 backdrop-blur md:p-10"
          >
            <h3 className="text-h3 font-semibold">{guideline.title}</h3>
            <p className="text-md text-navy/80">{guideline.text}</p>
          </li>
        ))}
      </ul>
      <div className="mt-12 flex flex-col items-start gap-6 rounded-3xl bg-navy p-6 text-white md:flex-row md:items-center md:justify-between md:p-10">
        <p className="max-w-xl text-lg">
          Do you have a question? Write us an email. We are glad to help.
        </p>
        <ButtonLink href={`mailto:${site.email}`}>
          <IconMail className="size-5" />
          {site.email}
        </ButtonLink>
      </div>
    </Section>
  )
}
