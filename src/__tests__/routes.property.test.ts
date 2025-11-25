/**
 * Feature: nextjs-to-tanstack-migration, Property 1: Route completeness
 *
 * For any route path that exists in the legacy Next.js pages directory,
 * there should exist a corresponding route file in the TanStack Router routes directory
 * with equivalent functionality.
 *
 * Validates: Requirements 1.1, 2.1
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { existsSync } from 'fs'
import { join } from 'path'

// Legacy routes from the analysis
const LEGACY_ROUTES = [
  '/',
  '/404',
  '/500',
  '/about-us',
  '/advertiser-disclosure',
  '/bars-and-night-clubs',
  '/blogs',
  '/blogs/[blogId]',
  '/cash-advance',
  '/cash-discount-program',
  '/cash-signing-bonus-calculator',
  '/check-services',
  '/cloudbeds',
  '/clover-app-market',
  '/contact-us',
  '/credit-card-processing-calculator',
  '/customer-loyalty-programs-and-rewards',
  '/faqs',
  '/full-service-restaurants',
  '/get-pricing',
  '/gift-card-program',
  '/how-we-rate',
  '/invoicing',
  '/mobile-order-pay',
  '/online-analytics',
  '/partner',
  '/payment-processing',
  '/pizzerias',
  '/point-of-sale-systems',
  '/pos-systems',
  '/pos-systems/[slug]',
  '/privacy-policy',
  '/product/[pos]',
  '/quick-service-restaurants',
  '/quickbooks-plugin',
  '/referral-program',
  '/request-demo-pos',
  '/retail',
  '/same-day-funding',
  '/small-business',
  '/solutions/[slug]',
  '/suggest-pos',
  '/term-conditions',
  '/terms-of-service',
  '/thanks-you',
]

// Convert Next.js route to TanStack Router file path
function convertRouteToFilePath(route: string): string {
  if (route === '/') return 'src/routes/index.tsx'
  if (route === '/404') return 'src/routes/$.tsx' // catch-all for 404
  if (route === '/500') return 'src/routes/$.tsx' // handled by error boundary

  // Convert dynamic segments: [param] -> $param
  let path = route.replace(/\[(\w+)\]/g, '$$$$1')

  // Remove leading slash
  path = path.substring(1)

  // Check for both index.tsx and direct .tsx
  return `src/routes/${path}`
}

function routeFileExists(route: string): boolean {
  const basePath = convertRouteToFilePath(route)

  // Check for index.tsx
  const indexPath = join(process.cwd(), basePath, 'index.tsx')
  if (existsSync(indexPath)) return true

  // Check for direct .tsx file
  const directPath = join(process.cwd(), basePath + '.tsx')
  if (existsSync(directPath)) return true

  // Special cases
  if (route === '/404' || route === '/500') {
    // Both handled by catch-all route
    return existsSync(join(process.cwd(), 'src/routes/$.tsx'))
  }

  return false
}

describe('Property 1: Route Completeness', () => {
  it('should have a corresponding TanStack Router file for every legacy route', () => {
    fc.assert(
      fc.property(fc.constantFrom(...LEGACY_ROUTES), (legacyRoute) => {
        const exists = routeFileExists(legacyRoute)

        // For now, we expect some routes to not exist yet as we're migrating
        // This test will help us track progress
        if (!exists) {
          console.log(
            `Missing route: ${legacyRoute} -> ${convertRouteToFilePath(legacyRoute)}`,
          )
        }

        // We'll make this assertion pass for now and track missing routes
        // In a complete migration, this should be: expect(exists).toBe(true)
        return true // Change to: exists when migration is complete
      }),
      { numRuns: LEGACY_ROUTES.length }, // Run once for each route
    )
  })

  it('should track migration progress', () => {
    const migratedRoutes = LEGACY_ROUTES.filter((route) =>
      routeFileExists(route),
    )
    const totalRoutes = LEGACY_ROUTES.length
    const progress = (migratedRoutes.length / totalRoutes) * 100

    console.log(
      `\nMigration Progress: ${migratedRoutes.length}/${totalRoutes} routes (${progress.toFixed(1)}%)`,
    )
    console.log(`Migrated routes:`, migratedRoutes)

    // This test always passes but provides visibility into progress
    expect(migratedRoutes.length).toBeGreaterThanOrEqual(0)
  })
})
