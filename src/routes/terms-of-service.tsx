import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/terms-of-service')({
  component: () => {
    const { t } = useTranslation()
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{t('Terms of Service')}</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p>
              {t('Please read these terms carefully before using our service.')}
            </p>
          </div>
        </div>
      </div>
    )
  },
})
