import { logEvent } from 'firebase/analytics'
import { analytics } from './firebase'

export function trackEvent(eventName, params = {}) {
  if (analytics) {
    logEvent(analytics, eventName, params)
  }
}
