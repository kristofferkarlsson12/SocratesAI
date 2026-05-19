const RATE_LIMIT_KEY = 'socratic_rate_limit'
const MAX_REQUESTS = 10
const WINDOW_MS = 60 * 60 * 1000

export function checkRateLimit() {
  const now = Date.now()
  const stored = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]')
  const recent = stored.filter(ts => now - ts < WINDOW_MS)
  if (recent.length >= MAX_REQUESTS) return false
  recent.push(now)
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent))
  return true
}
