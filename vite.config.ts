import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import svgr from 'vite-plugin-svgr'

const config = defineConfig({
  plugins: [
    devtools(),
    svgr(),
    nitro(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  // Environment variable handling
  envPrefix: 'VITE_',

  // Build optimization settings
  build: {
    target: 'esnext',
    minify: 'esbuild',
    // sourcemap: true,
    // Disable CSS code splitting to inline critical CSS
    cssCodeSplit: false,
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 500,
    // Enable tree-shaking for optimal bundle sizes
    // This removes unused code from translation files and dependencies
    modulePreload: {
      // Add preload hints for language bundles and CSS files to improve loading performance
      // This tells the browser to preload resources with high priority
      polyfill: true,
      resolveDependencies: (_filename, deps) => {
        // Always include all dependencies (CSS, JS) for preloading
        // This ensures CSS files get preload hints to reduce render-blocking
        return deps
      },
    },
    rollupOptions: {
      // Enable aggressive tree-shaking to remove unused code
      treeshake: {
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        // Optimize chunk file names for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks(id) {
          // Only apply manual chunks for client build, not SSR
          if (id.includes('node_modules')) {
            // React core - separate chunk for better caching
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }

            // TanStack Router - separate chunk
            if (id.includes('@tanstack/react-router')) {
              return 'router-vendor'
            }

            // TanStack Query - separate chunk
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor'
            }

            // i18n vendor chunk for core i18n libraries
            if (
              id.includes('i18next') ||
              id.includes('react-i18next') ||
              id.includes('i18next-browser-languagedetector')
            ) {
              return 'i18n-vendor'
            }

            // Form libraries - separate chunk (react-hook-form, zod)
            // These are only needed on form pages
            if (id.includes('react-hook-form') || id.includes('zod')) {
              return 'form-vendor'
            }

            // UI libraries - separate chunk (sonner for toasts)
            if (id.includes('sonner')) {
              return 'ui-vendor'
            }

            // Seroval - separate chunk for serialization
            if (id.includes('seroval')) {
              return 'seroval-vendor'
            }

            // Other node_modules go into a general vendor chunk
            return 'vendor'
          }

          // Spanish translation files - create separate chunk for lazy loading
          // This enables code splitting so Spanish translations are only loaded when needed
          if (id.includes('/locales/es/')) {
            return 'i18n-es'
          }

          // English translations bundled with main app (no separate chunk)
          // This ensures English loads synchronously with the main bundle
          // Note: We explicitly don't create a chunk for /locales/en/ files

          // Return undefined for all other modules to use default chunking
          return undefined
        },
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
})

export default config
