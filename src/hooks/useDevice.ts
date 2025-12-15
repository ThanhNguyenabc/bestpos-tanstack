import { useCallback, useEffect, useState } from 'react'

export const BreakPoints = {
  tablet: 768,
  desktop: 1440,
} as const

function getBreakpointFromWidth() {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return {
      isMobile: true,
      isTablet: false,
      isLaptop: false,
      screenSize: 0,
    }
  }

  const isMobile = !window.matchMedia('(min-width: 768px)').matches
  const isTablet =
    window.matchMedia('(min-width: 768px)').matches &&
    !window.matchMedia('(min-width: 1440px)').matches

  return {
    isMobile,
    isTablet,
    isLaptop: window.matchMedia('(min-width: 1440px)').matches,
    screenSize: window.innerWidth,
  }
}

export const useDevice = () => {
  const [breakPoint, setBreakPoint] = useState<
    ReturnType<typeof getBreakpointFromWidth>
  >(() => getBreakpointFromWidth())

  const handleResize = useCallback(() => {
    if (typeof window === 'undefined') return

    requestAnimationFrame(() => {
      setBreakPoint(getBreakpointFromWidth())
    })
  }, [])

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    setBreakPoint(getBreakpointFromWidth())

    // Use matchMedia for better performance
    const mobileQuery = window.matchMedia('(min-width: 768px)')
    const desktopQuery = window.matchMedia('(min-width: 1440px)')

    const handleMediaChange = () => {
      handleResize()
    }

    mobileQuery.addEventListener('change', handleMediaChange)
    desktopQuery.addEventListener('change', handleMediaChange)

    return () => {
      mobileQuery.removeEventListener('change', handleMediaChange)
      desktopQuery.removeEventListener('change', handleMediaChange)
    }
  }, [handleResize])

  return breakPoint
}
