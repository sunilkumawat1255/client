import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Make sure your build directory is named 'build' (for Vercel)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Create a separate chunk for node_modules
          }
          // You can add additional chunking logic here
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increase the warning size limit to 1000 KB (1MB)
  }
});
