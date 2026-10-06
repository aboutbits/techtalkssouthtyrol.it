import classNames from 'classnames'
import { ReactNode } from 'react'

type PillProps = {
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}

export function Pill({ children, tone = 'dark', className }: PillProps) {
  return (
    <span
      className={classNames(
        'inline-flex items-center gap-2 rounded-full px-5 py-2 text-md',
        tone === 'dark' ? 'bg-slate text-white' : 'bg-navy/10 text-navy',
        className,
      )}
    >
      {children}
    </span>
  )
}

type IconPillLinkProps = {
  href: string
  icon: ReactNode
  label: string
  detail: string
  external?: boolean
}

/**
 * The contact pill from the flyer: a round icon, a label and a detail line.
 */
export function IconPillLink({
  href,
  icon,
  label,
  detail,
  external = false,
}: IconPillLinkProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group inline-flex items-center gap-3 rounded-full bg-slate py-1.5 pl-1.5 pr-6 text-white transition-colors hover:bg-slate-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-base font-semibold">{label}</span>
        <span className="text-xs text-slate-muted group-hover:text-white">
          {detail}
        </span>
      </span>
    </a>
  )
}
