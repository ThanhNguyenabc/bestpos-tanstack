import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/point-of-sale-systems')({
  component: () => {
    const { t } = useTranslation()
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            {t('Point of Sale Systems')}
          </h1>
          <p className="text-xl text-neutral-600 mb-8">
            {t('Find the perfect POS for your business')}
          </p>
          <Button asChild size="lg">
            <Link to="/pos-systems">
              {t('Browse POS Systems')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    )
  },
})
