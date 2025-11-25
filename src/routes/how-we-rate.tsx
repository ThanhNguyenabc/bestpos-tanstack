import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, DollarSign, Users, Zap } from 'lucide-react'

export const Route = createFileRoute('/how-we-rate')({
  component: HowWeRatePage,
})

const criteria = [
  {
    icon: Star,
    title: 'Features & Functionality',
    description:
      'We evaluate the breadth and depth of features offered by each POS system',
    weight: '30%',
  },
  {
    icon: DollarSign,
    title: 'Pricing & Value',
    description:
      'We assess the cost relative to features and compare pricing models',
    weight: '25%',
  },
  {
    icon: Users,
    title: 'Ease of Use',
    description: 'We test user interface, setup process, and learning curve',
    weight: '25%',
  },
  {
    icon: Zap,
    title: 'Support & Reliability',
    description: 'We evaluate customer support quality and system uptime',
    weight: '20%',
  },
]

function HowWeRatePage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            {t('How We Rate POS Systems')}
          </h1>
          <p className="text-xl text-neutral-600">
            {t('Our comprehensive evaluation methodology')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {criteria.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <item.icon className="h-8 w-8 text-primary" />
                  <CardTitle>{t(item.title)}</CardTitle>
                </div>
                <div className="text-sm font-semibold text-primary">
                  {t('Weight')}: {item.weight}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">{t(item.description)}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>{t('Our Process')}</h2>
          <p>
            {t(
              'We conduct hands-on testing of each POS system, interview business owners, and analyze customer reviews to provide accurate, unbiased ratings.',
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
