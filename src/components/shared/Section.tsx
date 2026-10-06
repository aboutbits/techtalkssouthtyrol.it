import classNames from 'classnames'
import { ReactNode } from 'react'

type SectionProps = {
  id?: string
  tone?: 'navy' | 'white' | 'pastel'
  children: ReactNode
  className?: string
}

const tones = {
  navy: 'bg-navy text-white',
  white: 'bg-white text-navy',
  pastel: 'bg-pastel text-navy',
}

export function Section({
  id,
  tone = 'white',
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={classNames('scroll-mt-20', tones[tone], className)}
    >
      <div className="mx-auto max-w-content px-4 py-18 md:px-10 lg:py-30">
        {children}
      </div>
    </section>
  )
}

type SectionHeaderProps = {
  label: string
  tone?: 'dark' | 'light'
  title: ReactNode
  children?: ReactNode
}

export function SectionHeader({
  label,
  tone = 'light',
  title,
  children,
}: SectionHeaderProps) {
  return (
    <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-col items-start gap-5">
        <span
          className={classNames(
            'rounded-full px-4 py-1.5 text-sm text-white',
            tone === 'dark' ? 'bg-slate' : 'bg-navy',
          )}
        >
          {label}
        </span>
        <h2 className="text-h2">{title}</h2>
      </div>
      {children}
    </div>
  )
}
