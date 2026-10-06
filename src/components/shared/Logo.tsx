import classNames from 'classnames'

type LogoProps = {
  className?: string
}

/**
 * The square logo from the flyer QR code: the name on four lines.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span
      className={classNames(
        'inline-flex aspect-square flex-col justify-center bg-navy px-1.5 text-[0.625rem] font-medium leading-[0.7rem] text-white ring-1 ring-white/20',
        className,
      )}
      aria-hidden="true"
    >
      <span>Tech</span>
      <span>Talks</span>
      <span>South</span>
      <span>Tyrol</span>
    </span>
  )
}
