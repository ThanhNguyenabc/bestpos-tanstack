import { defineConfig } from 'vite'
// import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => ({
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

    rollupOptions: {
      treeshake: {
        moduleSideEffects: false, // true tree-shaking
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },

      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',

        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Keep only essential vendor chunks
            if (id.includes('react') || id.includes('react-dom')) return 'react'

            if (id.includes('@tanstack')) return 'tanstack'
            if (id.includes('react-hook-form') || id.includes('zod')) {
              return 'form-vendor'
            }
            if (
              id.includes('i18next') ||
              id.includes('react-i18next') ||
              id.includes('i18next-browser-languagedetector')
            ) {
              return 'i18n-vendor'
            }
            // Everything else small goes into one vendor chunk
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
