import { Section } from '../../shared/Section'

type AboutProps = {
  stats: {
    episodes: number
    talks: number
    speakers: number
    cities: number
  }
}

const features = [
  {
    title: 'Two talks per evening',
    text: 'Speakers from the local tech scene and beyond share real experiences from their projects: from web development, mobile and DevOps to data and AI.',
  },
  {
    title: 'Networking, drinks and snacks',
    text: 'After the talks, we stay together to discuss, meet new people and exchange ideas. Seniors, juniors and everyone in between are welcome.',
  },
  {
    title: 'Across South Tyrol',
    text: 'Local companies and institutions host the episodes in their rooms. So far, we met in Bozen, Brixen, Bruneck and Klausen.',
  },
]

export function About({ stats }: AboutProps) {
  return (
    <Section id="about" tone="pastel">
      <p className="max-w-5xl text-h2 font-normal">
        We are a <strong>group of tech lovers</strong> that meet together for
        engaging, informative and in-person <strong>talks</strong>.{' '}
        <strong>Join us for our next meetup</strong> to explore and discuss the
        latest in tech with fellow enthusiasts!
      </p>

      <dl className="mt-16 grid grid-cols-2 gap-4 lg:mt-24 lg:grid-cols-4">
        {[
          { label: 'Episodes', value: stats.episodes },
          { label: 'Talks', value: stats.talks },
          { label: 'Speakers', value: stats.speakers },
          { label: 'Cities', value: stats.cities },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse gap-1 rounded-3xl bg-white/60 p-6 backdrop-blur"
          >
            <dt className="text-md text-slate">{stat.label}</dt>
            <dd className="text-h2 font-semibold">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-16 grid gap-10 md:grid-cols-3 lg:mt-24">
        {features.map((feature) => (
          <li key={feature.title} className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-md text-navy/80">{feature.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
