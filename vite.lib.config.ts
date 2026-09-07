import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    dts({
        include: ['src/components/**/*.tsx', 'src/components/**/*.ts', 'src/index.ts'],
        exclude: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx', '**/*.stories.ts'],
        tsconfigPath: './tsconfig.app.json',
    }),
  ],
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, 'src/index.ts'),
      name: 'PrepDesignSystem',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
    outDir: 'dist',
  },
});