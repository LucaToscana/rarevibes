import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  base: '/', // 👈 corretto per GitHub Pages
  plugins: [react()],
})

/**mkdir -p src/locales/es src/locales/fr && \
for file in common.json privacy.json bios.json articles.json; do \
  cp src/locales/en/$file src/locales/es/$file && \
  cp src/locales/en/$file src/locales/fr/$file; \
done */