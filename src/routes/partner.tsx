import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/partner')({
  component: () => {
    const { t } = useTranslation()
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{t('Partner With Us')}</h1>
          <p className="text-xl text-neutral-600">
            {t('Join our partner network')}
          </p>
        </div>
      </div>
    )
  },
})
