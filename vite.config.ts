import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' || command === 'serve' ? '/factory-audit-demo/' : '/',
  preview: {
    port: 4173,
    host: true
  }
}))
