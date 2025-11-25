import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/thanks-you')({
  component: () => {
    const { t } = useTranslation()
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">{t('Thank You!')}</h1>
          <p className="text-xl text-neutral-600 mb-8">
            {t("We've received your request and will be in touch soon.")}
          </p>
          <Button asChild>
            <Link to="/">{t('Return Home')}</Link>
          </Button>
        </div>
      </div>
    )
  },
})
