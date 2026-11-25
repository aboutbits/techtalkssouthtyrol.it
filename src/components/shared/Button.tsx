import classNames from 'classnames'
import Link from 'next/link'
import { ReactNode } from 'react'

export type ButtonVariant = 'light' | 'dark' | 'outline-light' | 'outline-dark'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  variant?: ButtonVariant
  external?: boolean
  className?: string
}

const variants = {
  light: 'bg-white text-navy hover:bg-cream',
  dark: 'bg-navy text-white hover:bg-slate',
  'outline-light': 'text-white ring-1 ring-white/40 hover:bg-white/10',
  'outline-dark': 'text-navy ring-1 ring-navy/30 hover:bg-navy/5',
}

const baseClasses =
  'group inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current'

/**
 * The classes of a button, for a link that ButtonLink cannot render.
 */
export function buttonClasses(variant: ButtonVariant, className?: string) {
  return classNames(baseClasses, variants[variant], className)
}

export function ButtonLink({
  href,
  children,
  variant = 'light',
  external = false,
  className,
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, className)

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
