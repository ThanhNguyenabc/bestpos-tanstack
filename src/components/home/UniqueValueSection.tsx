import { useTranslation } from 'react-i18next'
import { CheckCircle } from 'lucide-react'
import Container from '../primitives/Container'

export function UniqueValueSection() {
  const { t } = useTranslation('common')

  const benefits = t('unique.items', { returnObjects: true }) as string[]

  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
              {t('unique.heading')}
            </h2>
            <p className="text-lg md:text-xl text-neutral-600">
              {t('unique.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-3 items-start">
                <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <p className="text-base text-neutral-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
