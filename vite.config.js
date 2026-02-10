import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
   globals: true,
   coverage: {
    provider: 'v8',
    reporter: ['text', 'lcov']
   },
   setupFiles: ['./src/setupTests.js'],
   ignoreWatch: ['node_modules', 'dist', 'build'],
   exclude: ['node_modules/*'] 
  }
})
