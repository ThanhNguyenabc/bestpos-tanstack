import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  plugins: [
    devtools(),
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
    sourcemap: true,
    cssCodeSplit: true,
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
    // rollupOptions: {
    //   output: {
    //     manualChunks: {
    //       react: ['react', 'react-dom'],
    //       vendor: ['@tanstack/react-router', 'axios', 'motion'], // example
    //     },
    //   },
    // },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Only apply manual chunks for client build, not SSR
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('@tanstack/react-router')) {
              return 'router-vendor'
            }
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
    // chunkSizeWarningLimit: 1000,
  },

  // Development server settings
  server: {
    port: 3000,
    strictPort: false,
    open: true,
  },

  // Preview server settings
  preview: {
    port: 3000,
    strictPort: false,
  },
})

export default config
