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
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'BestPOS - Find the Best POS System for Your Business',
      },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg' },
      {
        rel: 'preconnect',
        href: '/',
      },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },

      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },

      {
        rel: 'dns-prefetch',
        href: '/',
      },
      {
        rel: 'preload',
        href: appCss,
        as: 'style',
      },

      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
      },
    ],
  }),
  errorComponent: ErrorBoundary,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { queryClient } = Route.useRouteContext()

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <I18nProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 min-h-screen">{children}</main>
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
