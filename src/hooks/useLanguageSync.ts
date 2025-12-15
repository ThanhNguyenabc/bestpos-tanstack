import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { getCurrentLanguage } from '@/utils/language-routing'

/**
 * Hook to sync URL language with i18n language
 * Automatically detects language from URL and updates i18n
 */
export function useLanguageSync() {
  const location = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    const urlLanguage = getCurrentLanguage(location.pathname)

    // Only change language if it's different from current
    if (urlLanguage !== i18n.language) {
      console.log('[Language] Syncing from URL:', urlLanguage)
      i18n.changeLanguage(urlLanguage)
    }
  }, [location.pathname, i18n])

  return {
    currentLanguage: getCurrentLanguage(location.pathname),
  }
}
