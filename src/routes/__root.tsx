import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import Footer from '../components/footer/Footer'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Toaster } from '../components/ui/toaster'
import appCss from '../styles.css?url'
import '../locales/index'
import Header from '@/components/header/Header'
import I18nProvider from '../locales/I18nProvider'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover',
      },
      {
        title: 'BestPOS - Find the Best POS System for Your Business',
      },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg' },
      // Preconnect to same origin for faster resource loading
      {
        rel: 'preconnect',
        href: '/',
      },
      // DNS prefetch as fallback for older browsers
      {
        rel: 'dns-prefetch',
        href: '/',
      },
      // Preload critical CSS to reduce render-blocking
      {
        rel: 'preload',
        href: appCss,
        as: 'style',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  errorComponent: ErrorBoundary,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { queryClient } = Route.useRouteContext()

  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <I18nProvider>
            <div className="flex w-full max-w-full flex-col min-h-screen overflow-x-hidden">
              <Header />
              <main className="flex-1 min-h-screen w-full max-w-full overflow-x-hidden">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </I18nProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
