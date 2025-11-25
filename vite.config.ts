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
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
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
