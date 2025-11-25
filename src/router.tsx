import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { createQueryClient } from './lib/queryClient'

// Create a QueryClient instance
const queryClient = createQueryClient()

// Create router with context - TanStack Start expects this to be named getRouter
export function getRouter() {
  return createTanStackRouter({
    routeTree,
    context: {
      queryClient,
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })
}

// Register router types
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
