import classNames from 'classnames'
import Link from 'next/link'
import { ReactNode } from 'react'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  variant?: 'light' | 'dark' | 'outline-light' | 'outline-dark'
  external?: boolean
  // Downloads the target, for example a calendar file, instead of opening it
  download?: boolean
  className?: string
}

const variants = {
  light: 'bg-white text-navy hover:bg-cream',
  dark: 'bg-navy text-white hover:bg-slate',
  'outline-light': 'text-white ring-1 ring-white/40 hover:bg-white/10',
  'outline-dark': 'text-navy ring-1 ring-navy/30 hover:bg-navy/5',
}

const baseClasses =
  'inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current'

export function ButtonLink({
  href,
  children,
  variant = 'light',
  external = false,
  download = false,
  className,
}: ButtonLinkProps) {
  const classes = classNames(baseClasses, variants[variant], className)

  if (download) {
    return (
      <a href={href} download className={classes}>
        {children}
      </a>
    )
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
