import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/term-conditions')({
  component: () => {
    const { t } = useTranslation()
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{t('Terms & Conditions')}</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-neutral-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p>
              {t(
                'These terms and conditions outline the rules and regulations for the use of our website.',
              )}
            </p>
          </div>
        </div>
      </div>
    )
  },
})
