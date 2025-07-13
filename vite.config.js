import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  base: '/rarevibes/', // 👈 corretto per GitHub Pages
  plugins: [react()],
})