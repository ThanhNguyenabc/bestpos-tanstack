import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/advertiser-disclosure')({
  component: () => {
    const { t } = useTranslation()
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            {t('Advertiser Disclosure')}
          </h1>
          <div className="prose prose-lg max-w-none">
            <p>
              {t(
                'We may receive compensation from some of the companies whose products we review.',
              )}
            </p>
          </div>
        </div>
      </div>
    )
  },
})
