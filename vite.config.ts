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

    // ❗ Put CSS back into CSS files (reduces JS drastically)
    cssCodeSplit: true,

    chunkSizeWarningLimit: 700,

    modulePreload: {
      polyfill: false, // ❗ reduce preload JS
    },

    // Optimize for smaller bundles
    reportCompressedSize: true,

    // Enable source maps for production debugging (optional)
    sourcemap: false,

    rollupOptions: {
      treeshake: {
        moduleSideEffects: false, // Aggressive tree-shaking
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
        preset: 'smallest', // Most aggressive preset
      },

      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',

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

            // React + React-dependent libraries in ONE chunk to avoid circular deps
            // This includes: react, react-dom, react-hook-form, zod, @radix-ui, etc.
            return 'vendor'
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
}))
