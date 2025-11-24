// src/utils/webVitals.ts
import { getCLS, getFID, getLCP, getFCP, getTTFB, Metric } from 'web-vitals'

export function reportWebVitals(onReport: (metric: Metric) => void) {
  getCLS(onReport)
  getFID(onReport)
  getLCP(onReport)
  getFCP(onReport)
  getTTFB(onReport)
}
