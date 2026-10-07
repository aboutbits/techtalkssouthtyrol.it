import { HostNotesPage } from '../components/pages/notes/HostNotesPage'
import { getNextEventPath, revalidateSeconds } from '../lib/events'

export function getStaticProps() {
  return {
    props: { nextEventPath: getNextEventPath() },
    revalidate: revalidateSeconds,
  }
}

export default function Page() {
  return <HostNotesPage />
}
