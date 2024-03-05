/* eslint import/no-extraneous-dependencies: off */
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      // SEE: https://stackoverflow.com/questions/71180561/vite-change-ouput-directory-of-assets
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }

          if (/ttf/i.test(extType)) {
            extType = 'font';
          }

          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
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
  define: {
    // SEE: https://vuejs.org/api/compile-time-flags#VUE_PROD_DEVTOOLS
    __VUE_PROD_DEVTOOLS__: true,
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
