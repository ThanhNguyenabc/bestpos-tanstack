import { useTranslation } from 'react-i18next'
import Container from '../primitives/Container'
import { Card, CardContent } from '@/components/ui/card'
import {
  Calculator,
  TrendingUp,
  Users,
  Award,
  DollarSign,
  Lightbulb,
} from 'lucide-react'

interface HelpingItem {
  icon: React.ElementType
  title: string
  description: string
  color: string
}

export function HelpingSection() {
  const { t } = useTranslation('home')

  const helpingItems: HelpingItem[] = [
    {
      icon: Calculator,
      title: t('helping.scheduling_demo.title') || 'Scheduling a Demo',
      description:
        t('helping.scheduling_demo.desc') ||
        'Get a live demo with our POS experts to see how it works for your business',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: TrendingUp,
      title:
        t('helping.customized_recommendations.title') ||
        'Customized Recommendations',
      description:
        t('helping.customized_recommendations.desc') ||
        'Receive tailored POS system recommendations based on your specific business needs',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: DollarSign,
      title: t('helping.exclusive_savings.title') || 'Exclusive Savings',
      description:
        t('helping.exclusive_savings.desc') ||
        'Get access to exclusive deals, signing bonuses, and cash discount programs',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Award,
      title: t('helping.greatest_deal.title') || 'Greatest Deal',
      description:
        t('helping.greatest_deal.desc') ||
        'We negotiate the best rates and terms to ensure you get the greatest value',
      color: 'bg-orange-50 text-orange-600',
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              {t('helping.heading') || 'Helping you'}
            </h2>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            {t('helping.subheading') ||
              'Find the Best POS System and Secure the Best Deal'}
          </h3>
          <p className="text-lg text-neutral-600">
            {t('helping.description') ||
              'BestPOS is more than just a comparison site. We guide you through every step of finding and implementing the perfect POS solution for your business.'}
          </p>
        </div>

        {/* Helping Items Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {helpingItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className="border-2 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div
                      className={`shrink-0 w-12 h-12 rounded-lg ${item.color} flex items-center justify-center`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-neutral-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-neutral-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
