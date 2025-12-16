import { memo, useId } from 'react'
import { cn } from '@/lib/utils'

const CIRCLE_RADIUS = 45
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS
const VIEW_BOX_SIZE = 100

interface CircularProgressProps {
  value: number
  children: React.ReactNode
  className?: string
  max?: number
  strokeWidth?: number
}

function CircularProgressComponent({
  value,
  children,
  className,
  max = 10,
  strokeWidth = 8,
}: CircularProgressProps) {
  const offset = CIRCLE_CIRCUMFERENCE - (value / max) * CIRCLE_CIRCUMFERENCE
  const center = VIEW_BOX_SIZE / 2
  const gradientId = useId()

  return (
    <div className={cn('relative', className)}>
      <svg
        className="size-full -rotate-90"
        viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#F7931E" />
            <stop offset="100%" stopColor="#FDB913" />
          </linearGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={CIRCLE_RADIUS}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-neutral-200"
        />
        <circle
          cx={center}
          cy={center}
          r={CIRCLE_RADIUS}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={CIRCLE_CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="transition-all duration-300"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export const CircularProgress = memo(CircularProgressComponent)
