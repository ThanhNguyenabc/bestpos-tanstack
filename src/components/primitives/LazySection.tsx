import { lazy, Suspense, ComponentType } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface LazySectionProps {
  /**
   * Minimum height to reserve space and prevent layout shift
   */
  minHeight?: string
  /**
   * Component to render when in viewport
   */
  children: React.ReactNode
  /**
   * Fallback while loading
   */
  fallback?: React.ReactNode
}

/**
 * LazySection - Loads content only when scrolled into viewport
 * Prevents unnecessary bundle size and improves initial load time
 */
export function LazySection({
  minHeight = '400px',
  children,
  fallback,
}: LazySectionProps) {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    rootMargin: '200px', // Start loading 200px before entering viewport
    triggerOnce: true, // Only load once
  })

  return (
    <div ref={ref} style={{ minHeight: isIntersecting ? 'auto' : minHeight }}>
      {isIntersecting ? (
        <Suspense
          fallback={
            fallback || (
              <div
                className="flex items-center justify-center bg-neutral-50"
                style={{ minHeight }}
              >
                <div className="animate-pulse text-neutral-400">Loading...</div>
              </div>
            )
          }
        >
          {children}
        </Suspense>
      ) : null}
    </div>
  )
}
