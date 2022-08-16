import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3030,
    strictPort: true,
    hmr: {
      clientPort: 3030
    }
  },
  preview: {
    host: "0.0.0.0",
    port: 3030,
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
})
