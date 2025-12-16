import { memo } from 'react'
import { LoadingSkeleton } from './LoadingSkeleton'

interface POSCardSkeletonProps {
  count?: number
  className?: string
}

function POSCardSkeletonComponent({
  count = 3,
  className = '',
}: POSCardSkeletonProps) {
  return (
    <LoadingSkeleton
      variant="card"
      count={count}
      className={`bg-white ${className}`}
    />
  )
}

// Memoize to prevent unnecessary re-renders
export const POSCardSkeleton = memo(POSCardSkeletonComponent)
