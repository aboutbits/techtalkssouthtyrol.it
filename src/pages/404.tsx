import { Layout } from '../components/layout/Layout'
import { Meta } from '../components/layout/Meta'
import { Brace } from '../components/shared/Brace'
import { ButtonLink } from '../components/shared/Button'
import { Pill } from '../components/shared/Pill'
import { getNextEventPath, revalidateSeconds } from '../lib/events'

export function getStaticProps() {
  return {
    props: { nextEventPath: getNextEventPath() },
    revalidate: revalidateSeconds,
  }
}

export default function Page() {
  return (
    <Layout>
      <Meta title="Page not found" />
      <section className="relative min-h-[70vh] overflow-hidden bg-navy text-white">
        <Brace className="pointer-events-none absolute inset-y-0 right-0 h-full w-12 md:w-48 lg:w-72" />
        <div className="relative mx-auto flex max-w-content flex-col items-start gap-8 py-24 pl-4 pr-16 md:px-10 md:pr-56 lg:pr-80">
          <Pill>404</Pill>
          <h1 className="text-h1 font-normal">This page could not be found.</h1>
          <ButtonLink href="/">Go to home</ButtonLink>
        </div>
      </section>
    </Layout>
  )
}
