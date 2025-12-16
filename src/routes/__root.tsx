import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from '../components/ErrorBoundary'
import appCss from '../styles.css?url'
import '../locales/index'
import Header from '@/components/header/Header'
import I18nProvider from '../locales/I18nProvider'
import { useLanguageSync } from '@/hooks/useLanguageSync'
import { lazy, Suspense } from 'react'

// Lazy load non-critical components
const Footer = lazy(() => import('../components/footer/Footer'))
const Toaster = lazy(() =>
  import('../components/ui/toaster').then((m) => ({ default: m.Toaster })),
)

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
      {
        httpEquiv: 'x-dns-prefetch-control',
        content: 'on',
      },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg' },
      {
        rel: 'preconnect',
        href: 'https://res.cloudinary.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'dns-prefetch',
        href: 'https://res.cloudinary.com',
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
        rel: 'preload',
        href: '/pos.json',
        as: 'fetch',
        crossOrigin: 'anonymous',
      },
    ],
    scripts: [
      {
        children: `
          (function() {
            if ('fonts' in document) {
              Promise.all([
                document.fonts.load('400 1em Inter'),
                document.fonts.load('600 1em Inter'),
                document.fonts.load('700 1em Inter')
              ]).then(function() {
                document.documentElement.classList.add('fonts-loaded');
              });
            }
          })();
        `,
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('connection' in navigator) {
                const conn = navigator.connection;
                if (conn && (conn.saveData || conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g')) {
                  document.documentElement.classList.add('slow-connection');
                }
              }
            `,
          }}
        />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <I18nProvider>
            <RootContent>{children}</RootContent>
          </I18nProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}

function RootContent({ children }: { children: React.ReactNode }) {
  useLanguageSync()

  return (
    <div className="flex w-full max-w-full flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-1 min-h-screen w-full max-w-full overflow-x-hidden">
        {children}
      </main>
      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <Toaster />
      </Suspense>
    </div>
  )
}
