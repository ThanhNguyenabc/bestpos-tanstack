import type { SEOTags } from '../api/seo'

type MetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }

interface HeadConfig {
  seo?: SEOTags | null
  additionalMeta?: MetaTag[]
}

/**
 * Creates a standardized head configuration for routes
 * Provides fallback meta tags if SEO data is not available
 */
export function createHead(config: HeadConfig = {}) {
  const { seo, additionalMeta = [] } = config

  // Default fallback meta tags
  const defaultTitle = 'BestPOS - Find the Best POS System for Your Business'
  const defaultDescription =
    'Compare and find the best POS system for your business. Expert reviews, pricing comparisons, and recommendations.'

  // If no SEO data, return defaults
  if (!seo) {
    return {
      meta: [
        {
          title: defaultTitle,
        },
        {
          name: 'description',
          content: defaultDescription,
        },
        ...additionalMeta,
      ],
    }
  }

  // Build meta tags from SEO data
  const metaTags: MetaTag[] = [
    {
      title: seo.title || defaultTitle,
    },
    {
      name: 'description',
      content: seo.description || defaultDescription,
    },
  ]

  // Add keywords if available
  if (seo.keywords) {
    metaTags.push({
      name: 'keywords',
      content: seo.keywords,
    })
  }

  // Add Open Graph tags
  metaTags.push({
    property: 'og:title',
    content: seo['og:title'] || seo.title || defaultTitle,
  } as MetaTag)

  metaTags.push({
    property: 'og:description',
    content: seo['og:description'] || seo.description || defaultDescription,
  } as MetaTag)

  // Add OG image if available
  if (seo['og:image']) {
    metaTags.push({
      property: 'og:image',
      content: seo['og:image'],
    } as MetaTag)
  }

  // Add Twitter Card tags
  metaTags.push({
    name: 'twitter:card',
    content: 'summary_large_image',
  })

  metaTags.push({
    name: 'twitter:title',
    content: seo['og:title'] || seo.title || defaultTitle,
  })

  metaTags.push({
    name: 'twitter:description',
    content: seo['og:description'] || seo.description || defaultDescription,
  })

  if (seo['og:image']) {
    metaTags.push({
      name: 'twitter:image',
      content: seo['og:image'],
    })
  }

  // Add any additional meta tags
  if (additionalMeta.length > 0) {
    metaTags.push(...additionalMeta)
  }

  return {
    meta: metaTags,
  }
}
