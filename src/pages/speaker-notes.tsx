import { SpeakerNotesPage } from '../components/pages/notes/SpeakerNotesPage'
import { getNextEventPath, revalidateSeconds } from '../lib/events'

export function getStaticProps() {
  return {
    props: { nextEventPath: getNextEventPath() },
    revalidate: revalidateSeconds,
  }
}

export default function Page() {
  return <SpeakerNotesPage />
}
