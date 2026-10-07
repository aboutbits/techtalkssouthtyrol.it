import { useId } from 'react'

// The brace in a 480 x 1600 box.
export const bracePath =
  'M480 0C380 0 290 60 290 190V520C290 700 160 780 0 785V815C160 820 290 900 290 1080V1410C290 1540 380 1600 480 1600Z'

type BraceProps = {
  className?: string
}

/**
 * The curly brace shape with the pastel gradient from the flyer.
 * The shape fills its container. The tip of the brace points to the left.
 */
export function Brace({ className }: BraceProps) {
  const id = useId()

  return (
    <svg
      viewBox="0 0 480 1600"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={`${id}-v`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3ce" />
          <stop offset="20%" stopColor="#fbdcda" />
          <stop offset="45%" stopColor="#bcd5dc" />
          <stop offset="65%" stopColor="#a0d4e0" />
          <stop offset="100%" stopColor="#a7d7e0" />
        </linearGradient>
        <radialGradient id={`${id}-h`} cx="0" cy="0.5" r="0.6">
          <stop offset="0%" stopColor="#fef3ce" stopOpacity="1" />
          <stop offset="100%" stopColor="#fef3ce" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={bracePath} fill={`url(#${id}-v)`} />
      <path d={bracePath} fill={`url(#${id}-h)`} />
    </svg>
  )
}
