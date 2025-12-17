import { useTranslation } from 'react-i18next'
import Container from '../primitives/Container'
import Image from '../ui/image'

export function HelpingPOSSection() {
  const { t } = useTranslation('home')

  const steps = [
    {
      icon: '/icons/ic_schedule.svg',
      title: t('helpingsection.schedule_a_demo'),
      description: t('helpingsection.schedule_a_demo_desc'),
    },
    {
      icon: '/icons/ic_business.svg',
      title: t('helpingsection.business_review'),
      description: t('helpingsection.business_review_desc'),
    },
    {
      icon: '/icons/ic_pricing.svg',
      title: t('helpingsection.obtain_pricing'),
      description: t('helpingsection.obtain_pricing_desc'),
    },
    {
      icon: '/icons/ic_decision.svg',
      title: t('helpingsection.final_decision'),
      description: t('helpingsection.final_decision_desc'),
    },
  ] as const

  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold md:text-3xl lg:text-4xl mb-4 md:mb-6">
              <span className="text-blue-500 block">
                {t('helpingsection.helping_section_title')
                  .split('\n')[0]
                  .replace(/<[^>]*>/g, '')}
              </span>
              <span className="text-neutral-900">
                {t('helpingsection.helping_section_title')
                  .split('\n')
                  .slice(1)
                  .join(' ')
                  .replace(/<[^>]*>/g, '')}
              </span>
            </h2>
            <p
              className="text-base md:text-xl text-neutral-700"
              dangerouslySetInnerHTML={{
                __html: t('helpingsection.helping_section_desc'),
              }}
            />
          </div>

          <div className="space-y-4 md:space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4 items-start">
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={56}
                  height={56}
                  className="shrink-0 w-14 h-14 md:w-16 md:h-16 object-contain"
                />
                <div>
                  <h3 className="text-base md:text-lg font-bold text-neutral-900 mb-1 md:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base font-medium text-neutral-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
