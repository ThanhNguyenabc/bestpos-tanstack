import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/referral-program')({
  component: () => {
    const { t } = useTranslation()
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{t('Referral Program')}</h1>
          <p className="text-xl text-neutral-600">
            {t('Earn rewards by referring businesses')}
          </p>
        </div>
      </div>
    )
  },
})
