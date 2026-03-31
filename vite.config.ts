import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Fix: Ensure process is cast to any for build-time environment checks
  const env = loadEnv(mode, (process as unknown as { cwd: () => string }).cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    base: '/',
    build: {
      outDir: 'dist',
      sourcemap: true,
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-ai': ['@google/genai'],
            'vendor-ui': ['lucide-react', 'react', 'react-dom'],
            'vendor-utils': ['html2canvas', 'dexie']
          }
        }
      },
      chunkSizeWarningLimit: 1000,
    },
    define: {
      // In Vite, variables must be prefixed with VITE_ to be exposed to the client.
      // We map the injected GEMINI_API_KEY to process.env.GEMINI_API_KEY for the SDK.
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || ''),
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || ''),
      'process.env.NODE_ENV': JSON.stringify(mode),
    }
  };
});