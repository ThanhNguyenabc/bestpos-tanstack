import { useCallback, useEffect, useState } from 'react'

export const BreakPoints = {
  tablet: 768,
  desktop: 1440,
} as const

function getBreakpointFromWidth() {
  console.log('use device::')
  const width = window.innerWidth
  const isMobile = width < BreakPoints.tablet
  const isTablet = !isMobile && width < BreakPoints.desktop

  return {
    isMobile,
    isTablet,
    isLaptop: !isMobile && !isTablet,
    screenSize: width,
  }
}

export const useDevice = () => {
  const [breakPoint, setBreakPoint] = useState<
    ReturnType<typeof getBreakpointFromWidth>
  >({
    isMobile: true,
    isLaptop: false,
    isTablet: false,
    screenSize: 0,
  })

  const handleResize = useCallback(() => {
    requestAnimationFrame(() => {
      setBreakPoint(getBreakpointFromWidth())
    })
  }, [])

  useEffect(() => {
    console.log('use effect::::')
    setBreakPoint(getBreakpointFromWidth())
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return breakPoint
}
