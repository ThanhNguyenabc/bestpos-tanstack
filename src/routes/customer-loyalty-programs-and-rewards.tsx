import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { ArrowRight, Award } from 'lucide-react'

export const Route = createFileRoute('/customer-loyalty-programs-and-rewards')({
  component: CustomerLoyaltyPage,
})

function CustomerLoyaltyPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <Award className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          {t('Customer Loyalty Programs')}
        </h1>
        <p className="text-xl text-neutral-600 mb-8">
          {t('Reward your best customers and increase repeat business')}
        </p>
        <Button asChild size="lg">
          <Link to="/get-pricing">
            {t('Get Started')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}