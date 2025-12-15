import { QueryClient } from '@tanstack/react-query'

/**
 * Create a new QueryClient instance
 * Used for both client and server-side rendering
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60, // 1 hour - SEO data doesn't change often
        gcTime: 1000 * 60 * 60, // 1 hour (formerly cacheTime)
        retry: 2,
        // Disable refetching on mount for SSR
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        retry: 0,
      },
    },
  })
}

// Default client for client-side
const HttpClient = createQueryClient()

export default HttpClient
