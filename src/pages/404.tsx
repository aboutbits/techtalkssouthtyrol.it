import { IconArrowRight } from '../components/icons/Icons'
import { Layout } from '../components/layout/Layout'
import { Meta } from '../components/layout/Meta'
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
      <section className="flex min-h-[70vh] items-center bg-navy text-white">
        <div className="mx-auto flex w-full max-w-content flex-col items-start gap-8 px-4 py-24 md:px-10">
          <Pill>404</Pill>
          <h1 className="text-h1 font-normal">This page could not be found.</h1>
          <ButtonLink href="/">
            Go to home
            <IconArrowRight className="size-5" />
          </ButtonLink>
        </div>
      </section>
    </Layout>
  )
}
