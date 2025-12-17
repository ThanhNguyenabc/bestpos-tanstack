import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import Container from '../primitives/Container'
import Image from '../ui/image'
import CheckCircle from '@/color-icons/check-cricle.svg?react'

const ICONS = {
  small: {
    icon: '/images/1-stations.png',
    color: '#FEEE95',
  },
  medium: {
    icon: '/images/3-stations.png',
    color: '#FECDCA',
  },
  large: {
    icon: '/images/6-stations.png',
    color: '#E9D7FE',
  },
}

export function MerchantFeeSection() {
  const { t } = useTranslation('home')
  const { t: common } = useTranslation('common')

  const options = t('merchant_option', { returnObjects: true }) as Array<{
    id: string
    heading: string
    pos_number: string
    price: string
    items: string[]
  }>

  return (
    <section className="py-16 md:py-20 bg-neutral-100">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6">
            {t('merchant_heading')}
          </h2>
          <p
            className="text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: t('merchant_desc') }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:mt-4">
          {options?.map((option) => {
            const { icon, color } = ICONS[option.id as keyof typeof ICONS]
            return (
              <div
                key={option.id}
                className="flex flex-col bg-white p-6 md:p-8 gap-6 w-full h-full rounded-2xl shadow-md border-t-[10px]"
                style={{ borderColor: color }}
              >
                <div className="flex flex-col gap-2 md:gap-4">
                  <h3 className="text-lg md:text-xl font-semibold">
                    {option.heading}
                  </h3>
                  <p className="text-neutral-600">{option.price}</p>
                </div>
                <div className="flex items-center justify-items-center">
                  <span className="flex-1 text-base font-semibold">
                    {option.pos_number}
                  </span>
                  <div className="w-[120px] h-[90px]">
                    <Image
                      src={icon}
                      alt={option.pos_number}
                      width={120}
                      height={90}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 pt-4 md:pt-8 border-t border-neutral-900">
                  {option.items.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <CheckCircle className="size-5 text-neutral-600 shrink-0" />
                      <p className="text-xs md:text-sm flex-1 text-neutral-900">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                <Button
                  variant={'solid'}
                  size={'lg'}
                  className="bg-neutral-900 w-full"
                >
                  {common('get_started')}
                </Button>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
