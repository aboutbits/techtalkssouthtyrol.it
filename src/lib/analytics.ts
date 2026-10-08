type Plausible = (
  eventName: string,
  options?: { props?: Record<string, string> },
) => void

/**
 * Sends a custom event to Plausible. To see the event in Plausible, add the
 * event name as a goal, and the property names as custom properties, in the
 * site settings. Without the Plausible script (no PLAUSIBLE_DOMAIN, or an ad
 * blocker), nothing happens.
 */
export function trackEvent(name: string, props?: Record<string, string>) {
  const { plausible } = window as Window & { plausible?: Plausible }

  plausible?.(name, props ? { props } : undefined)
}
