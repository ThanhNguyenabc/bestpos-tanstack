import type { SEOTags } from '../api/seo'

/**
 * Simple in-memory cache for SEO tags
 * Useful for SSR to avoid repeated API calls
 */

interface CacheEntry {
  data: SEOTags | null
  timestamp: number
}

class SEOCache {
  private cache: Map<string, CacheEntry> = new Map()
  private defaultTTL: number = 1000 * 60 * 60 // 1 hour

  /**
   * Generate cache key from page and locale
   */
  private getCacheKey(page: string, locale: string): string {
    return `${page}:${locale}`
  }

  /**
   * Check if cache entry is still valid
   */
  private isValid(entry: CacheEntry): boolean {
    const now = Date.now()
    return now - entry.timestamp < this.defaultTTL
  }

  /**
   * Get cached SEO tags
   */
  get(page: string, locale: string): SEOTags | null | undefined {
    const key = this.getCacheKey(page, locale)
    const entry = this.cache.get(key)

    if (!entry) {
      return undefined // Not in cache
    }

    if (!this.isValid(entry)) {
      // Cache expired, remove it
      this.cache.delete(key)
      return undefined
    }

    console.log(`[SEO Cache] Hit for ${key}`)
    return entry.data
  }

  /**
   * Set SEO tags in cache
   */
  set(page: string, locale: string, data: SEOTags | null): void {
    const key = this.getCacheKey(page, locale)
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })
    console.log(`[SEO Cache] Set for ${key}`)
  }

  /**
   * Clear specific cache entry
   */
  clear(page: string, locale: string): void {
    const key = this.getCacheKey(page, locale)
    this.cache.delete(key)
    console.log(`[SEO Cache] Cleared ${key}`)
  }

  /**
   * Clear all cache entries
   */
  clearAll(): void {
    this.cache.clear()
    console.log('[SEO Cache] Cleared all entries')
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys()),
    }
  }

  /**
   * Clean up expired entries
   * Note: get() also removes expired entries lazily, but this cleanup
   * ensures entries that are never accessed again don't stay in memory
   */
  cleanup(): void {
    const now = Date.now()
    let cleaned = 0

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp >= this.defaultTTL) {
        this.cache.delete(key)
        cleaned++
      }
    }

    if (cleaned > 0) {
      console.log(`[SEO Cache] Cleaned up ${cleaned} expired entries`)
    }
  }
}

// Create singleton instance
export const seoCache = new SEOCache()

// Run cleanup once per hour (same as TTL)
// This prevents memory leaks from expired entries that are never accessed again
if (typeof setInterval !== 'undefined') {
  setInterval(
    () => {
      seoCache.cleanup()
    },
    1000 * 60 * 60,
  ) // 1 hour
}
