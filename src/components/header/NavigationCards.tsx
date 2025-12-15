import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { cn } from '@/lib/utils'
import Image from '../ui/image'
import Text from '../primitives/Text'

interface BaseCardProps {
  href: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

const BaseHeaderCard = memo(
  ({ children, href, className, onClick }: BaseCardProps) => {
    return (
      <Link
        to={href}
        className={cn(
          'inline-flex w-full bg-neutral-100 rounded-2xl overflow-hidden gap-2 items-center border-2 border-neutral-100 hover:border-primary transition-all',
          className,
        )}
        onClick={onClick}
      >
        {children}
      </Link>
    )
  },
)

BaseHeaderCard.displayName = 'BaseHeaderCard'

interface SolutionCardProps {
  title: string
  href: string
  src?: string
  description?: string
  onClick?: () => void
}

export const SolutionCard = memo(
  ({ title, href, src, description, onClick }: SolutionCardProps) => {
    const { t } = useTranslation()

    return (
      <BaseHeaderCard href={href} onClick={onClick}>
        <div className="flex-1 p-4 gap-1 flex flex-col">
          <Text className="text-base font-semibold">{t(title)}</Text>
          {description && (
            <Text className="text-sm text-neutral-600">{t(description)}</Text>
          )}
        </div>

        <Image
          width={150}
          height={150}
          alt={title}
          src={src}
          className="w-28 md:w-36 aspect-square shrink-0"
          loading="lazy"
        />
      </BaseHeaderCard>
    )
  },
)

SolutionCard.displayName = 'SolutionCard'

interface BusinessCardProps {
  title: string
  href: string
  src?: string
  onClick?: () => void
}

export const BusinessCard = memo(
  ({ title, href, src, onClick }: BusinessCardProps) => {
    const { t } = useTranslation()

    return (
      <BaseHeaderCard
        href={href}
        className="h-36 md:h-48 relative"
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/60" />
        <Text className="absolute left-3 bottom-3 md:left-5 md:bottom-5 text-white font-semibold text-base md:text-lg">
          {t(title)}
        </Text>
        <Image
          width={150}
          height={150}
          alt={title}
          src={src}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </BaseHeaderCard>
    )
  },
)

BusinessCard.displayName = 'BusinessCard'

interface ProductCardProps {
  title: string
  href: string
  src?: string
  onClick?: () => void
}

export const ProductCard = memo(
  ({ title, href, src, onClick }: ProductCardProps) => {
    const { t } = useTranslation()

    return (
      <BaseHeaderCard href={href} onClick={onClick}>
        <Image width={80} height={80} alt={src} src={src} loading="lazy" />
        <Text className="font-semibold text-base">{t(title)}</Text>
      </BaseHeaderCard>
    )
  },
)

ProductCard.displayName = 'ProductCard'
