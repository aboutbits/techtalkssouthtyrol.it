const timeZone = 'Europe/Rome'

function toDate(date: string) {
  // Noon UTC is the same calendar day in Europe/Rome
  return new Date(`${date}T12:00:00Z`)
}

export function formatDate(date: string) {
  return toDate(date).toLocaleDateString('en-GB', {
    timeZone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatShortDate(date: string) {
  return toDate(date).toLocaleDateString('en-GB', {
    timeZone,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateParts(date: string) {
  const value = toDate(date)

  return {
    day: value.toLocaleDateString('en-GB', { timeZone, day: '2-digit' }),
    month: value.toLocaleDateString('en-GB', { timeZone, month: 'short' }),
    year: value.toLocaleDateString('en-GB', { timeZone, year: 'numeric' }),
  }
}

export function formatSpeakerNames(names: string[]) {
  if (names.length <= 1) {
    return names.join('')
  }

  return `${names.slice(0, -1).join(', ')} & ${names.slice(-1).join('')}`
}

/**
 * Returns the first letter of the first and the last name, for example "AL" for "Alex Lanz".
 */
export function formatInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.charAt(0) ?? ''
  const last = parts.length > 1 ? (parts.at(-1)?.charAt(0) ?? '') : ''

  return `${first}${last}`.toUpperCase()
}
