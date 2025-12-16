import { defineConfig } from 'vite'
// import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig(() => ({
  plugins: [
    svgr(),
    nitro(),
    viteTsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ].filter(Boolean),

  envPrefix: 'VITE_',

  build: {
    target: 'esnext',
    minify: 'esbuild',

    cssCodeSplit: true,

    chunkSizeWarningLimit: 700,

    modulePreload: {
      polyfill: false,
    },

    reportCompressedSize: true,

    sourcemap: true,

    cssMinify: 'lightningcss',

    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
        preset: 'smallest',
      },

      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        experimentalMinChunkSize: 20000,

        manualChunks(id) {
          if (id.includes('node_modules')) {
            // TanStack Router & Query - keep together with vendor
            // Splitting causes issues with header components that use router hooks
            if (id.includes('@tanstack')) {
              return 'tanstack'
            }

            // i18n - independent from React, can be separate
            if (
              id.includes('i18next') ||
              id.includes('react-i18next') ||
              id.includes('i18next-browser-languagedetector')
            ) {
              return 'i18n-vendor'
            }

            // Lucide icons - large but independent
            if (id.includes('lucide-react')) {
              return 'icons'
            }

            // HTTP client - independent, used for API calls
            if (id.includes('axios')) {
              return 'http'
            }

            // Form libraries - split separately (only used on form pages)
            if (
              id.includes('react-hook-form') ||
              id.includes('zod') ||
              id.includes('@hookform')
            ) {
              return 'forms'
            }

            // Keep React + Radix UI together to avoid context errors
            // Radix UI components need to share React context
            if (
              id.includes('react/') ||
              id.includes('react-dom/') ||
              id.includes('@radix-ui')
            ) {
              return 'vendor'
            }

            // Other vendor libraries
            return 'vendor'
          }

          // Split footer into separate chunk (lazy loaded)
          if (id.includes('/components/footer/')) {
            return 'footer'
          }

          // Split navigation cards into separate chunk (lazy loaded on hover)
          if (id.includes('/components/header/NavigationCards')) {
            return 'nav-cards'
          }

          // i18n ES only (lazy loaded)
          if (id.includes('/locales/es/')) return 'i18n-es'

          return undefined
        },
      },
    },
  },

  server: {
    watch: { usePolling: true },
  },

  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },

  cacheDir: 'node_modules/.vite',

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@tanstack/react-router',
      '@tanstack/react-query',
      'react-i18next',
      'i18next',
    ],
    exclude: ['@tanstack/react-start'],
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
  },
}))
