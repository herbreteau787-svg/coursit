import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base relative : le build fonctionne partout (GitHub Pages /coursit/, serveur local, sous-dossier)
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 900
  }
});
