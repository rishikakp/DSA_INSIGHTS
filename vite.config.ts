import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4173,
    proxy: {
      '/api': 'http://localhost:3001',
      '/execute': 'http://localhost:3001',
    },
  },
  build: {
    outDir: 'backend/src/main/resources/static',
    emptyOutDir: true,
  },
});
