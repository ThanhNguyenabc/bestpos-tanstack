export const reportWebVitals = () => {
  if (typeof window === 'undefined') return

  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime)
          }
          if (entry.entryType === 'first-input') {
            console.log(
              'FID:',
              (entry as PerformanceEventTiming).processingStart -
                entry.startTime,
            )
          }
          if (
            entry.entryType === 'layout-shift' &&
            !(entry as any).hadRecentInput
          ) {
            console.log('CLS:', (entry as any).value)
          }
        }
      })

      observer.observe({
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'],
      })
    } catch (e) {
      console.error('Performance observer error:', e)
    }
  }

  if ('performance' in window && 'getEntriesByType' in performance) {
    window.addEventListener('load', () => {
      const paintEntries = performance.getEntriesByType('paint')
      paintEntries.forEach((entry) => {
        console.log(`${entry.name}:`, entry.startTime)
      })
    })
  }
}
