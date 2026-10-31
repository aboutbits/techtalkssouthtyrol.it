import { Event, SlideConfig } from './types'

/**
 * The slides of an event without a "presentation" field in the front matter.
 */
export const defaultSlides: SlideConfig['type'][] = [
  'title',
  'about',
  'agenda',
  'get-involved',
  'next-event',
]

const slideTypes: SlideConfig['type'][] = [
  'title',
  'about',
  'agenda',
  'host',
  'talk',
  'next-event',
  'get-involved',
  'custom',
]

/**
 * Returns the slides of the presentation of an event in the long form.
 * Throws an error at build time if the front matter has an invalid slide.
 */
export function getSlides(event: Event): SlideConfig[] {
  return (event.presentation ?? defaultSlides).map((entry, index) => {
    const slide: SlideConfig =
      typeof entry === 'string' ? ({ type: entry } as SlideConfig) : entry
    const position = `slide ${index + 1} of the presentation of ${event.slug}`

    if (!slideTypes.includes(slide.type)) {
      throw new Error(
        `Unknown type "${slide.type}" in ${position}. Use one of: ${slideTypes.join(', ')}.`,
      )
    }

    // A missing number gives NaN, and talks[NaN] is undefined
    if (slide.type === 'talk' && event.talks[slide.talk - 1] === undefined) {
      throw new Error(
        `The talk number in ${position} must be between 1 and ${event.talks.length}.`,
      )
    }

    return slide
  })
}
