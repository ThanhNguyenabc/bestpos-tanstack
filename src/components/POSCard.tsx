import { memo, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import Image from './ui/image'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { RecommendTag } from './primitives/RecommendTag'
import { CircularProgress } from './ui/CircularProgress'
import IcCheck from '@/icons/check.svg?react'
import IcIOS from '@/icons/apple.svg?react'
import IcAndroid from '@/icons/android.svg?react'
import IcWindow from '@/icons/windows.svg?react'
import Flex from './ui/flex'

const ChevronRightIcon = () => (
  <Image src="/icons/chevron-right.svg" alt="" className="size-3" />
)
const RecommendIcon = ({ className }: { className?: string }) => (
  <Image src="/icons/ic_recommend.svg" alt="" className={className} />
)

const OS_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  iOS: IcIOS,
  Android: IcAndroid,
  Windows: IcWindow,
  Window: IcWindow,
}

import type { ProcessedPOSProduct } from '@/models/pos'

interface POSCardProps extends Omit<ProcessedPOSProduct, 'id'> {
  pricing?: {
    setup?: string
    monthly?: string
  }
}

function POSCardComponent({
  name,
  slug,
  logo,
  rating,
  features,
  priority,
  overview,
  os_system,
}: POSCardProps) {
  const { t } = useTranslation()
  const { t: posTrans } = useTranslation('pos_systems')

  const ratingText = useMemo(
    () =>
      priority
        ? posTrans('outstanding') || 'Outstanding'
        : posTrans('good') || 'Good',
    [priority, t],
  )

  const readReviewText = useMemo(
    () => posTrans('read_review') || 'Read Review',
    [t],
  )

  const freeQuoteText = useMemo(
    () => posTrans('free_pos')?.replace('#', name) || `Get Free ${name} Quote`,
    [t, name],
  )

  const formattedRating = useMemo(() => rating.toFixed(1), [rating])

  return (
    <div
      className={cn(
        'relative w-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-2xl border-2 border-white hover:border-secondary transition-all duration-300',
        priority == 'first' && 'border-orange-500',
      )}
    >
      {/* Recommend tag - desktop only */}
      {priority && (
        <div className="hidden md:block absolute -top-4 left-4">
          <RecommendTag priority={priority} />
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col md:flex-row border-b border-neutral-300">
        {/* Logo section */}
        <Link
          to={`/pos-systems/${slug}`}
          className="flex flex-col items-center justify-center p-4 md:flex-1"
        >
          {/* Mobile recommend badge */}
          {priority === 'first' && (
            <div className="md:hidden flex items-center gap-2 bg-primary text-white px-2 py-1 rounded-br-lg rounded-tl-lg w-fit mb-2">
              <RecommendIcon className="size-3" />
              <p className="text-[10px] font-semibold">
                {t('most_recommended')}
              </p>
            </div>
          )}

          {/* Logo */}
          {logo ? (
            <Image
              src={logo}
              alt={`${name} logo`}
              width={160}
              height={80}
              quality={85}
              priority={priority === 'first'}
              className="w-[120px] md:w-40 aspect-2/1 object-contain"
            />
          ) : (
            <div className="w-[120px] md:w-40 h-[60px] md:h-20 flex items-center justify-center bg-neutral-100 rounded">
              <span className="text-sm md:text-lg font-bold text-neutral-400">
                {name}
              </span>
            </div>
          )}
        </Link>

        {/* Features section - desktop only */}
        <div className="hidden md:flex flex-1 flex-col p-4">
          {overview && (
            <p className="text-base font-bold line-clamp-5 mb-2">{overview}</p>
          )}
          <ul className="flex flex-col flex-1 text-left space-y-2">
            {features.slice(0, 4).map((item, index) => (
              <li className="flex items-center gap-2" key={`${index}-feature`}>
                <IcCheck className="size-6 text-blue-500 shrink-0" />
                <p className="text-sm flex-1 text-neutral-700">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Rating section */}
        <Link
          to={`/pos-systems/${slug}`}
          className="flex flex-col items-center justify-center gap-1 p-4 md:flex-1 md:border-l md:border-r border-neutral-300"
        >
          <CircularProgress value={rating} className="size-12 md:size-16">
            <p className="text-lg md:text-2xl font-bold">{formattedRating}</p>
          </CircularProgress>
          <p className="text-sm text-neutral-600">{ratingText}</p>
          <div className="inline-flex items-center gap-1 text-xs md:text-sm font-bold hover:underline text-secondary">
            {readReviewText}
            <ChevronRightIcon />
          </div>
        </Link>

        {/* CTA section */}
        <div className="flex flex-col items-center justify-center gap-4 md:gap-6 p-4 md:flex-1 border-t md:border-t-0 border-neutral-300">
          <p className="text-sm md:text-base font-semibold text-center hover:underline text-secondary cursor-pointer">
            {freeQuoteText}
          </p>
          <Button
            variant="solid"
            size="responsive"
            className="rounded-[30px] w-full bg-success hover:bg-success/90 text-sm md:text-base"
          >
            {t('request_a_demo')}
          </Button>
        </div>
      </div>

      {/* OS icons footer */}
      <div className="flex gap-3 p-3">
        {os_system?.map((item, index) => {
          const Icon = OS_ICONS[item]
          return <Icon key={index} className="size-6 text-neutral-600" />
        })}
      </div>
    </div>
  )
}

export const POSCard = memo(POSCardComponent)
