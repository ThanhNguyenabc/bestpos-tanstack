import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/pizzerias')({
  component: PizzeriasPage,
})

const features = [
  'Online ordering integration',
  'Delivery management',
  'Custom pizza builder',
  'Kitchen display system',
  'Caller ID integration',
  'Loyalty programs',
]

function PizzeriasPage() {
  const { t } = useTranslation('pizzerias')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {t('POS Systems for Pizzerias')}
          </h1>
          <p className="text-xl text-neutral-600">
            {t('Specialized POS for pizza restaurants')}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('Features for Pizzerias')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{t(feature)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/get-pricing">
              {t('Get Free Quote')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
