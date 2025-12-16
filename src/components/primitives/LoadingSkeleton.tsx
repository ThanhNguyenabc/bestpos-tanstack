import { memo } from 'react'

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'circle' | 'rectangle'
  width?: string
  height?: string
  count?: number
  className?: string
}

function LoadingSkeletonComponent({
  variant = 'rectangle',
  width,
  height,
  count = 1,
  className = '',
}: LoadingSkeletonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return 'h-64 rounded-2xl'
      case 'text':
        return 'h-4 rounded'
      case 'circle':
        return 'rounded-full aspect-square'
      case 'rectangle':
      default:
        return 'rounded-lg'
    }
  }

  const baseClasses = `bg-neutral-200 animate-pulse ${getVariantClasses()} ${className}`
  const style = {
    width: width || undefined,
    height: height || undefined,
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={baseClasses}
          style={style}
          aria-label="Loading content"
        />
      ))}
    </>
  )
}

// Memoize to prevent unnecessary re-renders
export const LoadingSkeleton = memo(LoadingSkeletonComponent)
