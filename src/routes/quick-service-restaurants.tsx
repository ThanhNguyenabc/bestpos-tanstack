import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/quick-service-restaurants')({
  component: QuickServiceRestaurantsPage,
})

const features = [
  'Fast order processing',
  'Kitchen display system',
  'Online ordering integration',
  'Drive-thru management',
  'Quick payment options',
  'Real-time reporting',
]

function QuickServiceRestaurantsPage() {
  const { t } = useTranslation('quick_service')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {t('POS Systems for Quick Service Restaurants')}
          </h1>
          <p className="text-xl text-neutral-600">
            {t('Speed and efficiency for your QSR')}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('Essential Features for QSR')}</CardTitle>
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
