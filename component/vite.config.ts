import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
