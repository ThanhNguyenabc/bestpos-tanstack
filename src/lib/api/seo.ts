import { AxiosClient } from './client'
import { seoCache } from '../seo/cache'

export interface SEOTags {
  title: string
  description: string
  keywords: string
  'og:title': string
  'og:description': string
  'og:image'?: string
}

interface MetaTagTranslation {
  title: string
  description: string
  keywords: string
}

interface StrapiResponse {
  data: Array<{
    tags: {
      [locale: string]: MetaTagTranslation
    } & {
      image?: string
    }
  }>
}

export const getSEOTags = async (
  page: string,
  locale = 'en',
): Promise<SEOTags | null> => {
  // Check cache first
  const cached = seoCache.get(page, locale)
  if (cached !== undefined) {
    return cached as SEOTags | null
  }

  try {
    console.log('[SEO] Fetching tags for page:', page, 'locale:', locale)

    const response = await AxiosClient.get<StrapiResponse>(
      `/meta-tags?filters[page][$eq]=${page}&pagination[pageSize]=1`,
    )

    if (response.status === 200 && response.data?.data?.[0]) {
      const metaTag = response.data.data[0].tags
      const translation = metaTag?.[locale]

      if (!translation) {
        console.warn(`[SEO] No translation found for locale: ${locale}`)
        seoCache.set(null, page, locale)
        return null
      }

      const seoTags: SEOTags = {
        title: translation.title || 'BestPOS',
        description:
          translation.description ||
          'Find the best POS system for your business',
        keywords: translation.keywords || '',
        'og:title': translation.title || 'BestPOS',
        'og:description':
          translation.description ||
          'Find the best POS system for your business',
      }

      // Add image if available
      if (metaTag.image) {
        seoTags['og:image'] = metaTag.image
      }

      console.log('[SEO] Tags loaded successfully:', seoTags.title)

      // Cache the result
      seoCache.set(seoTags, page, locale)

      return seoTags
    }

    console.warn('[SEO] No SEO data found for page:', page)
    seoCache.set(null, page, locale)
    return null
  } catch (error) {
    console.error('[SEO] Error fetching SEO tags for page:', page, error)
    // Don't cache errors, return null
    return null
  }
}
