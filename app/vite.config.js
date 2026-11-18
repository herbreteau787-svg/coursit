import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages : déploiement sous https://herbreteau787-svg.github.io/coursit/
export default defineConfig({
  plugins: [react()],
  base: '/coursit/',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 900
  }
});
