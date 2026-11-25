type Plausible = (
  eventName: string,
  options?: { props?: Record<string, string>; callback?: () => void },
) => void

/**
 * Sends a custom event to Plausible. To see the event in Plausible, add the
 * event name as a goal, and the property names as custom properties, in the
 * site settings. Without the Plausible script (no PLAUSIBLE_DOMAIN, or an ad
 * blocker), nothing is sent.
 *
 * The callback runs after Plausible sent the event, or at once without the
 * Plausible script. Use it to leave the page after the event, because the
 * browser can cancel the request when the page changes.
 */
export function trackEvent(
  name: string,
  props?: Record<string, string>,
  callback?: () => void,
) {
  const { plausible } = window as Window & { plausible?: Plausible }

  if (!plausible) {
    callback?.()
    return
  }

  plausible(name, { props, callback })
}
