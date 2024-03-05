// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyLib',
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // TODO - Use this
      external: ['vue'],
      output: {
        manualChunks: {}
      }
    }
  }
});
