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

const CLASSES = {
  flexRow: 'flex flex-row',
  flexCol: 'flex flex-col',
  flexCenter: 'flex items-center justify-center',
  logoSize: 'w-[120px] md:w-40',
  logoHeight: 'h-[60px] md:h-20',
  textSmMd: 'text-sm md:text-base',
  textNeutral: 'text-neutral-600',
  textSecondary: 'text-secondary',
  borderNeutral: 'border-neutral-300',
  hiddenMd: 'hidden md:flex',
  mdHidden: 'md:hidden',
  padding: 'p-3 md:p-4',
  paddingY: 'py-3 md:py-8',
  gap: 'gap-5 md:gap-8',
} as const

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
      {priority && (
        <div className="hidden md:block absolute -top-4 left-4">
          <RecommendTag priority={priority} />
        </div>
      )}

      <div className={cn(CLASSES.flexCol, 'border-b', CLASSES.borderNeutral)}>
        <div className={CLASSES.flexRow}>
          <Link
            to={`/pos-systems/${slug}`}
            className={cn(
              CLASSES.flexCol,
              'justify-center pr-4 md:pr-0 md:flex-1 md:items-center md:p-4',
            )}
          >
            {priority === 'first' && (
              <div
                className={cn(
                  CLASSES.mdHidden,
                  CLASSES.flexRow,
                  'bg-primary text-white px-1 items-center gap-2 rounded-br-lg rounded-tl-lg w-fit',
                )}
              >
                <RecommendIcon className="size-3" />
                <p className="text-[10px] font-semibold mt-1">
                  {t('most_recommended')}
                </p>
              </div>
            )}

            {logo ? (
              <Image
                src={logo}
                alt={`${name} logo`}
                width={140}
                height={70}
                className={cn(
                  CLASSES.logoSize,
                  'pt-1 md:pt-0 aspect-2/1 object-contain ml-3 md:ml-0',
                )}
              />
            ) : (
              <div
                className={cn(
                  CLASSES.logoSize,
                  CLASSES.logoHeight,
                  CLASSES.flexCenter,
                  'pt-1 md:pt-0 bg-neutral-100 rounded ml-3 md:ml-0',
                )}
              >
                <span className="text-sm md:text-lg font-bold text-neutral-400">
                  {name}
                </span>
              </div>
            )}

            <div
              className={cn(
                CLASSES.mdHidden,
                CLASSES.flexRow,
                'gap-2 pl-3 items-center py-2',
              )}
            >
              <CircularProgress
                value={rating}
                className="size-10 md:size-[64px]"
              >
                <p className="text-sm font-bold">{formattedRating}</p>
              </CircularProgress>
              <div className={CLASSES.flexCol}>
                <p className={cn('text-sm', CLASSES.textNeutral)}>
                  {ratingText}
                </p>
                <div
                  className={cn(
                    'inline-flex items-center gap-1 text-xs hover:underline',
                    CLASSES.textSecondary,
                  )}
                >
                  {readReviewText}
                  <ChevronRightIcon />
                </div>
              </div>
            </div>
          </Link>

          <div className={cn(CLASSES.hiddenMd, 'flex-1 flex-col p-4 md:ml-2')}>
            {overview && (
              <p className="text-base font-bold line-clamp-5 mb-2">
                {overview}
              </p>
            )}
            <ul className={cn(CLASSES.flexCol, 'flex-1 text-left space-y-2')}>
              {features.slice(0, 4).map((item, index) => (
                <li
                  className={cn(CLASSES.flexRow, 'items-center gap-2')}
                  key={`${index}-item-pros`}
                >
                  <IcCheck className="size-6 text-blue-500" />
                  <p className="text-sm flex-1 text-left text-neutral-700">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to={`/pos-systems/${slug}`}
            className={cn(
              CLASSES.hiddenMd,
              'flex-1 flex-col border-l border-r gap-1 py-8 px-4 items-center justify-center',
              CLASSES.borderNeutral,
            )}
          >
            <CircularProgress value={rating} className="size-16">
              <p className="text-2xl font-bold">{formattedRating}</p>
            </CircularProgress>
            <p className={cn('text-sm', CLASSES.textNeutral)}>{ratingText}</p>
            <div
              className={cn(
                'inline-flex items-center gap-1 text-sm font-bold hover:underline',
                CLASSES.textSecondary,
              )}
            >
              {readReviewText}
              <ChevronRightIcon />
            </div>
          </Link>

          <div
            className={cn(
              CLASSES.flexCol,
              'flex-1 items-center justify-end px-2 md:px-4 md:self-center border-l md:border-l-0 md:border-t-0',
              CLASSES.borderNeutral,
              CLASSES.paddingY,
              CLASSES.gap,
            )}
          >
            <p
              className={cn(
                CLASSES.textSmMd,
                'font-semibold leading-5 cursor-pointer text-center hover:underline',
                CLASSES.textSecondary,
              )}
            >
              {freeQuoteText}
            </p>
            <Button
              variant="solid"
              size="responsive"
              className={cn(
                'rounded-[30px] w-full bg-success hover:bg-success/90',
                CLASSES.textSmMd,
              )}
            >
              {t('request_a_demo')}
            </Button>
          </div>
        </div>
      </div>

      <Flex className="gap-3 p-3">
        {os_system?.map((item) => {
          const Icon = OS_ICONS[item]
          return <Icon className="size-6 text-neutral-600" />
        })}
      </Flex>
    </div>
  )
}

export const POSCard = memo(POSCardComponent)
