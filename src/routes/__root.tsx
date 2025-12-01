import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Toaster } from '../components/ui/toaster'
import appCss from '../styles.css?url'
import '../locales/index'
// Load Inter font weights
import '@fontsource/inter/latin-300.css' // Light
import '@fontsource/inter/latin-400.css' // Regular - most used
import '@fontsource/inter/latin-500.css' // Medium
import '@fontsource/inter/latin-600.css' // Semibold - headings
import '@fontsource/inter/latin-700.css' // Bold - emphasis
import '@fontsource/inter/latin-800.css' // Extra Bold
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
      // Preload all font weights to reduce render-blocking
      {
        rel: 'preload',
        href: '/assets/inter-latin-300-normal-BVlfKGgI.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/assets/inter-latin-400-normal-C38fXH4l.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/assets/inter-latin-500-normal-Cerq10X2.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/assets/inter-latin-600-normal-LgqL8muc.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/assets/inter-latin-700-normal-Yt3aPRUw.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/assets/inter-latin-800-normal-BYj_oED-.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
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
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 min-h-screen">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
