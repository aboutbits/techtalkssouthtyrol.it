import Image from 'next/image'
import { team } from '../../../data/team'
import { Section, SectionHeader } from '../../shared/Section'

export function Team() {
  return (
    <Section id="team" tone="navy">
      <SectionHeader label="Team" tone="dark" title="The people behind it">
        <p className="max-w-md text-md text-slate-muted">
          The organizers of Tech Talks South Tyrol. Talk to us at the next
          meetup or write us an email.
        </p>
      </SectionHeader>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
        {team.map((member) => (
          <li key={member.name} className="flex flex-col gap-4">
            <div className="bg-pastel relative aspect-square overflow-hidden rounded-3xl">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">{member.name}</span>
              {member.company && (
                <span className="text-sm text-slate-muted">
                  {member.companyUrl ? (
                    <a
                      href={member.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white hover:underline"
                    >
                      {member.company}
                    </a>
                  ) : (
                    member.company
                  )}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
