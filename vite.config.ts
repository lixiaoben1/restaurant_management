import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/target': {
        target: 'http://192.168.1.113:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/target/, '')
      }
    },
    host: '0.0.0.0' // 本机的局域网IP
  }
})
