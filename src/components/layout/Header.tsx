import Link from 'next/link'
import { Logo } from '../shared/Logo'
import { defaultNextEventPath, useNextEventPath } from './NextEventPath'

// Links with "mobile: false" show on larger screens only.
const navigation = [
  { href: '/', label: 'Home', mobile: true },
  { href: defaultNextEventPath, label: 'Next event', mobile: true },
  { href: '/events', label: 'All events', mobile: true },
  { href: '/#community', label: 'Community', mobile: false },
  { href: '/#get-involved', label: 'Get involved', mobile: false },
]

export function Header() {
  const nextEventPath = useNextEventPath()

  return (
    <header className="sticky top-0 z-30 bg-navy/80 text-white backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-4 py-3 md:gap-6 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Logo className="w-11" />
          <span className="hidden text-md font-semibold md:inline">
            Tech Talks South Tyrol
          </span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 text-sm md:gap-2 md:text-base">
            {navigation.map((item) => (
              <li
                key={item.href}
                className={item.mobile ? undefined : 'hidden md:block'}
              >
                <Link
                  href={
                    item.href === defaultNextEventPath
                      ? nextEventPath
                      : item.href
                  }
                  className="block whitespace-nowrap rounded-full p-2 transition-colors hover:bg-slate focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:px-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
