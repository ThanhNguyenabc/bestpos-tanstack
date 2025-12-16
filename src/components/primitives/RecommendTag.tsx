import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import type { POSPriority } from '@/models/pos'
import Image from '../ui/image'

// Priority configuration - created once at module level
const PRIORITY_CONFIG = {
  first: {
    tagColor: 'bg-[#F79009]',
    iconColor: 'text-neutral-900',
  },
  second: {
    tagColor: 'bg-neutral-400',
    iconColor: 'text-neutral-900',
  },
  third: {
    tagColor: 'bg-[#80523D]',
    iconColor: 'text-white',
  },
} as const

interface RecommendTagProps {
  priority: POSPriority
  className?: string
}

function RecommendTagComponent({ priority, className }: RecommendTagProps) {
  const { t } = useTranslation()
  const config =
    PRIORITY_CONFIG[priority as keyof typeof PRIORITY_CONFIG] ||
    PRIORITY_CONFIG.first

  return (
    <div className={cn('flex flex-row w-fit', className)}>
      <div
        className={cn(
          'flex items-center justify-center px-3 py-0.5 rounded-l-2xl',
          config.tagColor,
        )}
      >
        <Image
          src="/icons/ic_recommend.svg"
          alt=""
          className={cn('size-6', config.iconColor)}
        />
      </div>
      <p
        className={cn(
          'flex-1 text-xs md:text-sm font-semibold px-3 py-1 rounded-r-2xl text-white',
          priority === 'first' ? 'bg-orange-500' : 'bg-secondary',
        )}
      >
        {t('most_recommended') || 'Most Recommended'}
      </p>
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export const RecommendTag = memo(RecommendTagComponent)
