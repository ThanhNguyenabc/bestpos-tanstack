import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'

// Constants for language persistence
const LANGUAGE_STORAGE_KEY = 'bestpos-language-preference'
const SUPPORTED_LANGUAGES = ['en', 'es'] as const

/**
 * Language persistence utilities
 */
const languagePersistence = {
  /**
   * Save language preference to localStorage
   * Handles edge cases like storage quota exceeded
   */
  save: (language: string): void => {
    try {
      if (!SUPPORTED_LANGUAGES.includes(language as any)) {
        console.warn(
          `Attempted to save unsupported language: ${language}. Defaulting to 'en'`,
        )
        language = 'en'
      }
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    } catch (error) {
      console.error(
        'Failed to save language preference to localStorage:',
        error,
      )
      // Continue execution - this is not a critical failure
    }
  },

  /**
   * Load language preference from localStorage
   * Handles edge cases: corrupted storage, unsupported languages, missing storage
   */
  load: (): string | null => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)

      if (!stored) {
        return null
      }

      // Validate that the stored language is supported
      if (!SUPPORTED_LANGUAGES.includes(stored as any)) {
        console.warn(
          `Stored language '${stored}' is not supported. Available languages: ${SUPPORTED_LANGUAGES.join(', ')}`,
        )
        // Clear corrupted/invalid data
        languagePersistence.clear()
        return null
      }

      return stored
    } catch (error) {
      console.error(
        'Failed to load language preference from localStorage:',
        error,
      )
      // Clear potentially corrupted data
      languagePersistence.clear()
      return null
    }
  },

  /**
   * Clear language preference from localStorage
   */
  clear: (): void => {
    try {
      localStorage.removeItem(LANGUAGE_STORAGE_KEY)
    } catch (error) {
      console.error(
        'Failed to clear language preference from localStorage:',
        error,
      )
    }
  },

  /**
   * Detect language on app initialization
   * Priority: localStorage > browser language > fallback to 'en'
   */
  detect: (): string => {
    // First, try to load from localStorage
    const storedLanguage = languagePersistence.load()
    if (storedLanguage) {
      return storedLanguage
    }

    // Second, try browser language detection
    try {
      const browserLanguage = navigator.language?.split('-')[0] || 'en'

      if (SUPPORTED_LANGUAGES.includes(browserLanguage as any)) {
        return browserLanguage
      }
    } catch (error) {
      console.error('Failed to detect browser language:', error)
    }

    // Fallback to English
    return 'en'
  },
}

// Use Vite's glob import for automatic translation file discovery
// This creates a map of all translation files that Vite will code-split
const translationModules = import.meta.glob<{ default: Record<string, any> }>(
  '/public/locales/**/*.json',
)

/**
 * Translation resource loader function
 * Dynamically loads translation files using Vite's import system
 * with error handling for failed imports
 */
const createTranslationLoader = () => {
  return async (language: string, namespace: string) => {
    const path = `/public/locales/${language}/${namespace}.json`

    try {
      // Check if the translation file exists in our glob map
      if (!translationModules[path]) {
        console.warn(
          `Translation file not found: ${path}. Available languages: en, es`,
        )
        throw new Error(`Translation file not found: ${path}`)
      }

      // Dynamically import the translation file
      const module = await translationModules[path]()

      if (!module || !module.default) {
        console.error(`Invalid translation module format for: ${path}`)
        throw new Error(`Invalid translation module format: ${path}`)
      }

      return module.default
    } catch (error) {
      console.error(
        `Failed to load translation: ${language}/${namespace}`,
        error,
      )
      // Re-throw to let i18next handle the fallback
      throw error
    }
  }
}

// Create the translation loader with error handling
const translationLoader = resourcesToBackend(createTranslationLoader())

// Detect initial language on app initialization

i18n
  .use(translationLoader)
  // .use(LanguageDetector) // detect user language
  .use(initReactI18next) // hook into React
  .init({
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES,
    debug: false, // set true for dev
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: true, // enable lazy loading with Suspense
    },
    // Preload English (default language) for eager loading
    preload: ['en'],
    // Configure language detector to use our custom detection
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
    },
  })

// Export utilities for external use if needed
export { languagePersistence }

export default i18n
