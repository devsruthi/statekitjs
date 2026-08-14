import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { defineConfig, type Plugin } from 'vitest/config';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const isStorybook = process.argv.some((arg) => arg.includes('storybook'));

/** Import `.svg` files as raw markup strings (matches tsup text loader). */
function svgAsRawPlugin(): Plugin {
  return {
    name: 'statekit-svg-as-raw',
    enforce: 'pre',
    load(id) {
      const file = id.split('?')[0] ?? id;
      if (!file.endsWith('.svg')) {
        return null;
      }

      const svg = readFileSync(file, 'utf8');
      return `export default ${JSON.stringify(svg)};`;
    },
  };
}

export default defineConfig({
  plugins: [
    svgAsRawPlugin(),
    react(),
    !isStorybook &&
      dts({
        include: ['src'],
        exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
        rollupTypes: true,
        insertTypesEntry: true,
      }),
  ],
  css: {
    modules: {
      // Export class names as written (`type_spokes`, `spokesWheel`).
      // camelCaseOnly turned `type_spokes` into `typeSpokes`, so Storybook
      // never applied the graphic styles (copy still showed).
      localsConvention: (name: string) => name,
    },
  },
  build: {
    lib: {
      entry: resolve(rootDir, 'src/index.ts'),
      name: 'StateKit',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        assetFileNames: 'assets/[name][extname]',
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    minify: false,
    cssCodeSplit: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/index.ts'],
    },
  },
});
