/**
 * Generic in-memory cache manager
 * Useful for SSR to avoid repeated API calls
 * Can be used for any type of data (SEO tags, API responses, etc.)
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
}

export class CacheManager<T = any> {
  private cache: Map<string, CacheEntry<T>> = new Map()
  private defaultTTL: number

  constructor(ttl: number = 1000 * 60 * 60) {
    this.defaultTTL = ttl // Default: 1 hour
  }

  /**
   * Generate cache key from multiple parts
   */
  private getCacheKey(...parts: string[]): string {
    return parts.join(':')
  }

  /**
   * Check if cache entry is still valid
   */
  private isValid(entry: CacheEntry<T>): boolean {
    const now = Date.now()
    return now - entry.timestamp < this.defaultTTL
  }

  /**
   * Get cached data
   * @param parts - Cache key parts (e.g., 'seo', 'home', 'en')
   * @returns Cached data or undefined if not found/expired
   */
  get(...parts: string[]): T | undefined {
    const key = this.getCacheKey(...parts)
    const entry = this.cache.get(key)

    if (!entry) {
      return undefined // Not in cache
    }

    if (!this.isValid(entry)) {
      // Cache expired, remove it
      this.cache.delete(key)
      return undefined
    }

    console.log(`[Cache] Hit for ${key}`)
    return entry.data
  }

  /**
   * Set data in cache
   * @param data - Data to cache
   * @param parts - Cache key parts (e.g., 'seo', 'home', 'en')
   */
  set(data: T, ...parts: string[]): void {
    const key = this.getCacheKey(...parts)
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })
    console.log(`[Cache] Set for ${key}`)
  }

  /**
   * Clear specific cache entry
   * @param parts - Cache key parts
   */
  clear(...parts: string[]): void {
    const key = this.getCacheKey(...parts)
    this.cache.delete(key)
    console.log(`[Cache] Cleared ${key}`)
  }

  /**
   * Clear all cache entries
   */
  clearAll(): void {
    this.cache.clear()
    console.log('[Cache] Cleared all entries')
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
      console.log(`[Cache] Cleaned up ${cleaned} expired entries`)
    }
  }

  /**
   * Start automatic cleanup interval
   * @param interval - Cleanup interval in milliseconds (defaults to TTL)
   */
  startCleanup(interval?: number): void {
    const cleanupInterval = interval || this.defaultTTL

    if (typeof setInterval !== 'undefined') {
      setInterval(() => {
        this.cleanup()
      }, cleanupInterval)
    }
  }
}

// Create cache instances for different use cases

/**
 * SEO tags cache - 1 hour TTL
 * Usage: seoCache.get('home', 'en') or seoCache.set(data, 'home', 'en')
 */
export const seoCache = new CacheManager<any>(1000 * 60 * 60)
seoCache.startCleanup()

/**
 * API response cache - 5 minutes TTL
 * Usage: apiCache.get('users', '123') or apiCache.set(data, 'users', '123')
 */
export const apiCache = new CacheManager<any>(1000 * 60 * 5)
apiCache.startCleanup()

/**
 * Generic cache - 1 hour TTL
 * Usage: genericCache.get('key1', 'key2') or genericCache.set(data, 'key1', 'key2')
 */
export const genericCache = new CacheManager<any>(1000 * 60 * 60)
genericCache.startCleanup()
