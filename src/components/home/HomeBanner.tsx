import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import Image from '../ui/image'
import Heading from '../primitives/heading'
import Section from '../primitives/Section'
import Text from '../primitives/Text'
import GetPricingButton from '../GetPricingButton'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const FEATURES = [
  {
    key: 'saving_money',
    icon: '/color-icons/save-money.svg',
    alt: 'Save Money Icon',
  },
  {
    key: 'siging_bonus',
    icon: '/color-icons/Receive Cash.svg',
    alt: 'Signing Bonus Icon',
  },
  {
    key: 'processing_fee',
    icon: '/color-icons/Zero Processing Fees.svg',
    alt: 'Zero Processing Fees Icon',
  },
] as const

export function HomeBanner() {
  const { t } = useTranslation('home')
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <>
      {/* Mobile sticky features - hidden on desktop with CSS */}
      <nav
        className="z-100 bg-accent lg:hidden sticky top-0 w-full px-2 py-2 flex gap-1.5 overflow-hidden"
        aria-label="Key features"
      >
        {FEATURES?.map(({ key, icon, alt }) => (
          <Badge
            key={key}
            className="flex-1 flex-col p-1 bg-accent gap-0.5 items-center justify-center min-w-0"
            role="listitem"
          >
            <Image
              width={20}
              height={20}
              src={icon}
              alt={alt}
              className="shrink-0"
            />
            <Text className="text-[10px] leading-tight font-semibold text-center wrap-break-word w-full">
              {t(key)}
            </Text>
          </Badge>
        ))}
      </nav>

      {/* Main banner - Hero section for SEO */}
      <Section
        className="bg-primary lg:h-[450px] overflow-hidden w-full py-0 md:py-0"
        aria-labelledby="hero-heading"
      >
        <div className="flex flex-col h-full gap-6 w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:flex-row lg:justify-center">
          {/* Content */}
          <div className="flex-1 py-6 md:p-8 xl:pl-20 flex flex-col items-center justify-center gap-4 md:gap-6 lg:items-start">
            <Heading
              type="h1"
              variant="responsive"
              className="text-white lg:text-start"
            >
              {t('pageTitle')}
            </Heading>

            <GetPricingButton />

            {/* Desktop features - only render on large screens */}
            {isDesktop && (
              <ul
                className="hidden lg:flex gap-2 mt-4"
                role="list"
                aria-label="Key benefits"
              >
                {FEATURES.map(({ key, icon, alt }) => (
                  <Badge
                    key={key}
                    className="flex-row bg-white gap-2 items-center"
                    role="listitem"
                  >
                    <Image width={26} height={26} src={icon} alt={alt} />
                    <Text className="text-xs font-semibold">{t(key)}</Text>
                  </Badge>
                ))}
              </ul>
            )}
          </div>

          {/* Image - only render on desktop to save bandwidth */}
          {isDesktop && (
            <div className="flex-1 flex lg:h-[700px] -translate-y-12 mx-auto">
              <Image
                width={612}
                height={612}
                src="https://res.cloudinary.com/dgrym3yz3/image/upload/f_auto,q_auto,w_612/bestpos/banner/qwllcfsf9qhtobo6qwij.png"
                alt="BestPOS point of sale system illustration showing multiple connected devices"
                className="object-contain"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
