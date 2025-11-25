import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, ArrowRight, CreditCard } from 'lucide-react'

export const Route = createFileRoute('/payment-processing')({
  component: PaymentProcessingPage,
})

function PaymentProcessingPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <CreditCard className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {t('Payment Processing Solutions')}
          </h1>
          <p className="text-xl text-neutral-600">
            {t('Accept all payment types with competitive rates')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>{t('Credit Cards')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                {t('Accept all major credit cards')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('Mobile Payments')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                {t('Apple Pay, Google Pay, and more')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('Contactless')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                {t('Fast and secure tap-to-pay')}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/get-pricing">
              {t('Get Started')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
