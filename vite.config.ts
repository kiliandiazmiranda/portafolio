import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
          if (id.includes('lucide-react')) return 'vendor-icons';
          if (id.includes('@fontsource')) return 'vendor-fonts';
          return 'vendor-libs';
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
