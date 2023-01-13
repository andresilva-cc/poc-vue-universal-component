import path from 'path'
import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    vue2Jsx({
      compositionAPI: {
        importSource: path.resolve('./src/h-demi.ts')
      }
    }),
    dts({
      insertTypesEntry: true,
      tsConfigFilePath: './tsconfig.json',
      rollupTypes: true
    })
  ],

  optimizeDeps: {
    exclude: ['vue-demi']
  },

  build: {
    minify: false,
    lib: {
      name: 'input-counter',
      entry: 'index.ts'
    },
    rollupOptions: {
      external: ['vue', 'vue-demi'],
      output: {
        globals: {
          'vue-demi': 'vue-demi',
          vue: 'vue'
        }
      }
    }
  }
})
