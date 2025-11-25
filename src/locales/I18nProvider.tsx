import { Suspense } from 'react'
import i18n from './index'
import { I18nextProvider } from 'react-i18next'

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={null}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Suspense>
  )
}
