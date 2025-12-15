/**
 * Language routing utilities for handling URL-based language switching
 */

export const SUPPORTED_LANGUAGES = ['en', 'es'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en'

/**
 * Extract language from pathname
 * @param pathname - Current pathname (e.g., '/es/about' or '/about')
 * @returns Language code or null if not found
 */
export function getLanguageFromPath(
  pathname: string,
): SupportedLanguage | null {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && SUPPORTED_LANGUAGES.includes(firstSegment as any)) {
    return firstSegment as SupportedLanguage
  }

  return null
}

/**
 * Remove language prefix from pathname
 * @param pathname - Current pathname (e.g., '/es/about')
 * @returns Pathname without language prefix (e.g., '/about')
 */
export function removeLanguagePrefix(pathname: string): string {
  const lang = getLanguageFromPath(pathname)
  if (!lang) return pathname

  return pathname.replace(new RegExp(`^/${lang}`), '') || '/'
}

/**
 * Add language prefix to pathname
 * @param pathname - Current pathname (e.g., '/about')
 * @param language - Language code to add
 * @returns Pathname with language prefix (e.g., '/es/about')
 */
export function addLanguagePrefix(
  pathname: string,
  language: SupportedLanguage,
): string {
  // Don't add prefix for default language (English)
  if (language === DEFAULT_LANGUAGE) {
    return removeLanguagePrefix(pathname)
  }

  // Remove any existing language prefix first
  const cleanPath = removeLanguagePrefix(pathname)

  // Add new language prefix
  return `/${language}${cleanPath === '/' ? '' : cleanPath}`
}

/**
 * Switch language in current pathname
 * @param currentPath - Current pathname
 * @param newLanguage - New language code
 * @returns New pathname with language switched
 */
export function switchLanguageInPath(
  currentPath: string,
  newLanguage: SupportedLanguage,
): string {
  const cleanPath = removeLanguagePrefix(currentPath)
  return addLanguagePrefix(cleanPath, newLanguage)
}

/**
 * Get current language from pathname or default
 * @param pathname - Current pathname
 * @returns Current language code
 */
export function getCurrentLanguage(pathname: string): SupportedLanguage {
  return getLanguageFromPath(pathname) || DEFAULT_LANGUAGE
}

/**
 * Check if pathname has language prefix
 * @param pathname - Current pathname
 * @returns True if pathname has language prefix
 */
export function hasLanguagePrefix(pathname: string): boolean {
  return getLanguageFromPath(pathname) !== null
}
