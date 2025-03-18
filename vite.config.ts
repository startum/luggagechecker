
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from 'vite-imagetools';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    imagetools(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Improve build output
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console logs in production
        drop_console: true, 
        // This helps with mobile optimization
        passes: 2
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Optimize chunking for better mobile performance
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('lucide')) {
              return 'vendor-icons';
            }
            return 'vendor-other';
          }
        },
      },
    },
    // Optimize for mobile
    target: 'es2015',
  },
}));
