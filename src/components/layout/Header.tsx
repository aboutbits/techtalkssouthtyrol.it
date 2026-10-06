import Link from 'next/link'
import { Logo } from '../shared/Logo'

// Links with "mobile: false" show on larger screens only.
const navigation = [
  { href: '/', label: 'Home', mobile: true },
  { href: '/#next-event', label: 'Next event', mobile: false },
  { href: '/events', label: 'Past events', mobile: true },
  { href: '/#get-involved', label: 'Get involved', mobile: false },
]

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-navy/90 text-white backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-4 py-3 md:px-10">
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
                  href={item.href}
                  className="block rounded-full px-3 py-2 transition-colors hover:bg-slate focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
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
