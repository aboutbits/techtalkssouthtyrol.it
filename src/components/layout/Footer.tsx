import Link from 'next/link'
import { site } from '../../data/site'
import { IconMail, IconX } from '../icons/Icons'
import { Logo } from '../shared/Logo'

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto flex max-w-content flex-col gap-10 border-t border-white/10 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-4">
          <Logo className="w-14" />
          <p className="max-w-xs text-sm text-slate-muted">
            Your quarterly tech event in South Tyrol to connect, share and
            discuss.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <li>
            <Link href="/events" className="hover:underline">
              Past events
            </Link>
          </li>
          <li>
            <Link href="/speaker-notes" className="hover:underline">
              Speaker notes
            </Link>
          </li>
          <li>
            <Link href="/host-notes" className="hover:underline">
              Host notes
            </Link>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 hover:underline"
            >
              <IconMail className="size-4" />
              {site.email}
            </a>
          </li>
          <li>
            <a
              href={site.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:underline"
            >
              <IconX className="size-4" />
              {site.twitterHandle}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
