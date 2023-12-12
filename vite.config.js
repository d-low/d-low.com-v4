import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: (name, filename) => {
        let componentName = filename
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
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
