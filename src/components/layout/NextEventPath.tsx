import { createContext, useContext } from 'react'

/**
 * The link of "Next event" in the header and the footer. Every page sets it
 * with the `nextEventPath` prop from `getStaticProps` (see `_app.tsx`).
 */
export const defaultNextEventPath = '/#next-event'

export const NextEventPathContext = createContext(defaultNextEventPath)

export function useNextEventPath() {
  return useContext(NextEventPathContext)
}
