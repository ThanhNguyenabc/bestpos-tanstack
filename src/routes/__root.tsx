import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
// import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Toaster } from '../components/ui/toaster'
import appCss from '../styles.css?url'
import '../locales/index'
// Load Inter font weights
// import '@fontsource/inter/latin-300.css?url' // Light
// import '@fontsource/inter/latin-400.css' // Regular - most used
// import '@fontsource/inter/latin-500.css' // Medium
// import '@fontsource/inter/latin-600.css' // Semibold - headings
// import '@fontsource/inter/latin-700.css' // Bold - emphasis
// import '@fontsource/inter/latin-800.css' // Extra Bold
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
      // DNS prefetch as fallback for older browsers
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
