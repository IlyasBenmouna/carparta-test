import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, '**/e2e/**'],
  },
});
