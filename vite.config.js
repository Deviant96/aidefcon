import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/aidefcon_site/wp-content/themes/aidefcon/',
})
