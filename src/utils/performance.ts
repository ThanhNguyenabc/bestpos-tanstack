export const prefetchImage = (src: string) => {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.as = 'image'
  link.href = src
  document.head.appendChild(link)
}

export const prefetchImages = (srcs: string[]) => {
  srcs.forEach(prefetchImage)
}

export const requestIdleCallback =
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (cb: IdleRequestCallback) => setTimeout(cb, 1)

export const cancelIdleCallback =
  typeof window !== 'undefined' && 'cancelIdleCallback' in window
    ? window.cancelIdleCallback
    : clearTimeout
