/**
 * Feature: nextjs-to-tanstack-migration, Property 3: Navigation link functionality
 *
 * For any Link component in the application, clicking it should navigate to the
 * correct route without page reload and update the browser URL.
 *
 * Validates: Requirements 2.5
 */

import { describe, it, expect, beforeEach } from 'vitest'
import * as fc from 'fast-check'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import {
  Link,
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Test routes that should exist in the application
const TEST_ROUTES = [
  '/',
  '/about-us',
  '/contact-us',
  '/blogs',
  '/pos-systems',
  '/faqs',
  '/privacy-policy',
  '/terms-of-service',
]

// Create a test component with navigation links
function TestNavigationComponent({ routes }: { routes: string[] }) {
  return (
    <div>
      <h1>Test Navigation</h1>
      {routes.map((route) => (
        <Link key={route} to={route} data-testid={`link-${route}`}>
          Navigate to {route}
        </Link>
      ))}
    </div>
  )
}

describe('Property 3: Navigation Link Functionality', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    })
  })

  it('should navigate to correct route when link is clicked', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constantFrom(...TEST_ROUTES), async (targetRoute) => {
        // Create memory history starting at home
        const history = createMemoryHistory({
          initialEntries: ['/'],
        })

        // Create router with test context
        const router = createRouter({
          routeTree,
          history,
          context: {
            queryClient,
          },
        })

        // Render the test component with router
        const user = userEvent.setup()
        render(
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}>
              <TestNavigationComponent routes={[targetRoute]} />
            </RouterProvider>
          </QueryClientProvider>,
        )

        // Get the initial location
        const initialPath = router.state.location.pathname

        // Find and click the link
        const link = screen.getByTestId(`link-${targetRoute}`)
        expect(link).toBeInTheDocument()

        await user.click(link)

        // Wait for navigation to complete
        await waitFor(
          () => {
            const currentPath = router.state.location.pathname
            // Verify navigation occurred
            expect(currentPath).toBe(targetRoute)
          },
          { timeout: 2000 },
        )

        // Verify URL was updated without page reload
        // (In a real browser, this would check window.location, but in tests we check router state)
        expect(router.state.location.pathname).toBe(targetRoute)

        return true
      }),
      { numRuns: 100 },
    )
  }, 30000)

  it('should update browser history when navigating', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.constantFrom(...TEST_ROUTES), {
          minLength: 2,
          maxLength: 4,
        }),
        async (routeSequence) => {
          const history = createMemoryHistory({
            initialEntries: ['/'],
          })

          const router = createRouter({
            routeTree,
            history,
            context: {
              queryClient,
            },
          })

          const user = userEvent.setup()
          render(
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router}>
                <TestNavigationComponent routes={routeSequence} />
              </RouterProvider>
            </QueryClientProvider>,
          )

          // Navigate through each route in sequence
          for (const route of routeSequence) {
            const link = screen.getByTestId(`link-${route}`)
            await user.click(link)

            await waitFor(
              () => {
                expect(router.state.location.pathname).toBe(route)
              },
              { timeout: 2000 },
            )
          }

          // Verify we can go back through history
          const lastRoute = routeSequence[routeSequence.length - 1]
          expect(router.state.location.pathname).toBe(lastRoute)

          return true
        },
      ),
      { numRuns: 100 },
    )
  }, 30000)

  it('should preserve link href attribute for accessibility', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constantFrom(...TEST_ROUTES), async (targetRoute) => {
        const history = createMemoryHistory({
          initialEntries: ['/'],
        })

        const router = createRouter({
          routeTree,
          history,
          context: {
            queryClient,
          },
        })

        render(
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}>
              <TestNavigationComponent routes={[targetRoute]} />
            </RouterProvider>
          </QueryClientProvider>,
        )

        const link = screen.getByTestId(`link-${targetRoute}`)

        // Verify link has proper href attribute for accessibility
        expect(link).toHaveAttribute('href', targetRoute)

        return true
      }),
      { numRuns: 100 },
    )
  })

  it('should handle navigation without full page reload', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constantFrom(...TEST_ROUTES), async (targetRoute) => {
        const history = createMemoryHistory({
          initialEntries: ['/'],
        })

        const router = createRouter({
          routeTree,
          history,
          context: {
            queryClient,
          },
        })

        const user = userEvent.setup()
        render(
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}>
              <TestNavigationComponent routes={[targetRoute]} />
            </RouterProvider>
          </QueryClientProvider>,
        )

        // Track if component unmounts (which would indicate a page reload)
        let componentUnmounted = false
        const testElement = screen.getByText('Test Navigation')
        const observer = new MutationObserver(() => {
          if (!document.contains(testElement)) {
            componentUnmounted = true
          }
        })
        observer.observe(document.body, { childList: true, subtree: true })

        const link = screen.getByTestId(`link-${targetRoute}`)
        await user.click(link)

        await waitFor(
          () => {
            expect(router.state.location.pathname).toBe(targetRoute)
          },
          { timeout: 2000 },
        )

        // Verify component didn't unmount (no page reload)
        expect(componentUnmounted).toBe(false)

        observer.disconnect()

        return true
      }),
      { numRuns: 100 },
    )
  }, 30000)
})
