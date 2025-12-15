import { QueryClient } from '@tanstack/react-query'

const HttpClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 2,
    },
    mutations: {
      retry: 0,
    },
  },
})

export default HttpClient
