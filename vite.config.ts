import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' || command === 'serve' ? '/factory-audit-demo/' : '/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        404: './public/404.html'
      }
    }
  },
  preview: {
    port: 4173,
    host: true
  }
}))
