/* eslint import/no-extraneous-dependencies: off */
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: (name, filename) => {
        const componentName = filename
          .replace(/\.vue.+$/, '')
          .split('/')
          .pop();

        return `${componentName}__${name}`;
      },
    },
  },
  plugins: [
    vue(),
    eslintPlugin(),
    stylelint({
      build: true,
      lintOnStart: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
