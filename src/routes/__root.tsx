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
// const Toaster = lazy(() =>
//   import('../components/ui/toaster').then((m) => ({ default: m.Toaster })),
// )

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
      // Preload CSS to start download early but not block render
      {
        rel: 'preload',
        href: appCss,
        as: 'style',
      },
      // {
      //   rel: 'preload',
      //   href: '/pos.json',
      //   as: 'fetch',
      //   crossOrigin: 'anonymous',
      // },
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
        {/* Critical inline CSS - ensures content is visible immediately */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              * { box-sizing: border-box; }
              html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                min-height: 100vh;
                overflow-x: hidden;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                font-size: 16px;
                font-weight: 500;
                line-height: 1.5;
                color: #101828;
                background: #fff;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
            `,
          }}
        />
        {/* Load CSS asynchronously to prevent render blocking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '${appCss}';
                document.head.appendChild(link);
              })();
            `,
          }}
        />
        {/* Fallback for no-JS */}
        <noscript>
          <link rel="stylesheet" href={appCss} />
        </noscript>
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
      {/* <Suspense fallback={null}>
        <Toaster />
      </Suspense> */}
    </div>
  )
}
