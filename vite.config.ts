import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import svgr from 'vite-plugin-svgr'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => ({
  plugins: [
    svgr(),
    nitro(),
    viteTsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    mode === 'analyze' &&
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
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

    esbuild: {
      legalComments: 'none',
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      treeShaking: true,
      drop: ['console', 'debugger'],
    },

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
        compact: true,
        generatedCode: {
          constBindings: true,
          arrowFunctions: true,
          objectShorthand: true,
        },

        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@tanstack')) {
              return 'tanstack'
            }

            // if (id.includes('@tanstack/react-query')) {
            //   return 'query'
            // }

            if (
              id.includes('i18next') ||
              id.includes('react-i18next') ||
              id.includes('i18next-browser-languagedetector')
            ) {
              return 'i18n'
            }

            // if (id.includes('axios')) {
            //   return 'http'
            // }

            if (
              id.includes('react-hook-form') ||
              id.includes('zod') ||
              id.includes('@hookform')
            ) {
              return 'forms'
            }

            if (
              id.includes('react/') ||
              id.includes('react-dom/') ||
              id.includes('@radix-ui')
            ) {
              return 'vendor'
            }

            return 'vendor'
          }

          if (id.includes('/components/footer/')) {
            return 'footer'
          }

          if (id.includes('/components/header/NavigationCards')) {
            return 'nav-cards'
          }

          if (id.includes('/locales/es/')) {
            return 'i18n-es'
          }

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
