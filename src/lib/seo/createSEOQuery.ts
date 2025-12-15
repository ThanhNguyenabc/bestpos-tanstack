import { queryOptions } from '@tanstack/react-query'
import { getSEOTags } from '../api/seo'

/**
 * Creates query options for fetching SEO tags
 * @param page - The page identifier (e.g., 'home', 'about', 'contact')
 * @param locale - The locale (default: 'en')
 * @param staleTime - Cache duration in milliseconds (default: 1 hour)
 */
export function createSEOQuery(
  page: string,
  locale = 'en',
  staleTime = 1000 * 60 * 60, // 1 hour default
) {
  return queryOptions({
    queryKey: ['seo', page, locale],
    queryFn: () => getSEOTags(page, locale),
    staleTime,
  })
}
