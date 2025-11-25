import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900 mb-6">
          {t('Privacy Policy')}
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-neutral-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p>
            {t(
              'Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.',
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
