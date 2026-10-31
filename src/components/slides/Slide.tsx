import classNames from 'classnames'
import { ReactNode, useContext } from 'react'
import { Brace } from '../shared/Brace'
import { Logo } from '../shared/Logo'
import { SlideNumberContext } from './SlideDeck'

export type SlideTone = 'navy' | 'white' | 'pastel'

const tones: Record<SlideTone, string> = {
  navy: 'bg-navy text-white',
  white: 'bg-white text-navy',
  pastel: 'bg-pastel text-navy',
}

type SlideProps = {
  episode: number
  tone?: SlideTone
  // The brace of the flyer at the right edge
  brace?: boolean
  // The logo and the slide number at the bottom
  footer?: boolean
  children: ReactNode
  className?: string
}

/**
 * The frame of a slide with a size of 1920 x 1080 pixels.
 * Use fixed pixel sizes inside, because the deck scales the whole slide.
 */
export function Slide({
  episode,
  tone = 'white',
  brace = false,
  footer = true,
  children,
  className,
}: SlideProps) {
  const { number, total } = useContext(SlideNumberContext)

  return (
    <section
      className={classNames(
        'relative flex size-full flex-col overflow-hidden',
        tones[tone],
      )}
    >
      {brace && (
        <Brace className="pointer-events-none absolute inset-y-0 right-0 h-full w-[432px]" />
      )}
      <div
        className={classNames(
          'relative flex flex-1 flex-col px-[120px] pt-[100px]',
          brace && 'pr-[520px]',
          footer ? 'pb-[40px]' : 'pb-[100px]',
          className,
        )}
      >
        {children}
      </div>
      {footer && (
        <footer
          className={classNames(
            'relative flex items-center justify-between px-[120px] pb-[56px] text-[24px]',
            brace && 'pr-[520px]',
            tone === 'navy' ? 'text-slate-muted' : 'text-slate',
          )}
        >
          <span className="flex items-center gap-[20px]">
            <Logo
              className={classNames(
                'w-[64px] rounded-[16px]',
                tone !== 'navy' && 'bg-navy',
              )}
            />
            Tech Talks South Tyrol · Episode {episode}
          </span>
          <span className="tabular-nums">
            {number} / {total}
          </span>
        </footer>
      )}
    </section>
  )
}

type SlideLabelProps = {
  children: ReactNode
  tone?: SlideTone
  className?: string
}

/**
 * The pill above the title of a slide.
 */
export function SlideLabel({
  children,
  tone = 'white',
  className,
}: SlideLabelProps) {
  return (
    <span
      className={classNames(
        'inline-flex self-start rounded-full px-[32px] py-[12px] text-[30px]',
        tone === 'navy' ? 'bg-slate text-white' : 'bg-navy text-white',
        className,
      )}
    >
      {children}
    </span>
  )
}

type SlideHeadingProps = {
  label?: string
  title?: ReactNode
  subtitle?: ReactNode
  tone?: SlideTone
  className?: string
}

/**
 * The label, the title and the subtitle of a slide. Use it on all slides with
 * a heading, so that the headings look the same.
 */
export function SlideHeading({
  label,
  title,
  subtitle,
  tone = 'white',
  className,
}: SlideHeadingProps) {
  return (
    <div className={classNames('flex flex-col gap-[40px]', className)}>
      {label && <SlideLabel tone={tone}>{label}</SlideLabel>}
      {title && (
        <h2 className="text-balance text-[96px] leading-none tracking-[-0.03em]">
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={classNames(
            'text-balance text-[40px] leading-snug',
            tone === 'navy' ? 'text-slate-muted' : 'text-slate',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

export type SlidePoint = {
  title: string
  text?: string
}

type SlidePointListProps = {
  points: SlidePoint[]
  tone?: SlideTone
  className?: string
}

/**
 * A list of short points with lines between them, for example on the right
 * side of a slide with two columns.
 */
export function SlidePointList({
  points,
  tone = 'white',
  className,
}: SlidePointListProps) {
  return (
    <ul
      className={classNames(
        'flex flex-col divide-y border-y',
        tone === 'navy'
          ? 'divide-white/15 border-white/15'
          : 'divide-navy/10 border-navy/10',
        className,
      )}
    >
      {points.map((point) => (
        <li key={point.title} className="flex flex-col gap-[4px] py-[32px]">
          <h3 className="text-[44px] font-semibold leading-tight">
            {point.title}
          </h3>
          {point.text && (
            <p
              className={classNames(
                'text-balance text-[32px]',
                tone === 'navy' ? 'text-slate-muted' : 'text-slate',
              )}
            >
              {point.text}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}
