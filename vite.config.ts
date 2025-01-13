import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import { fileURLToPath, URL } from 'node:url';
import autoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

dotenv.config();

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/assets/styles/root/variables";
          @import "src/assets/styles/root/mixins";
        `
      }
    }
  },

  plugins: [
    vue(),
    vueDevTools(),

    autoImport({
      dirs: ['src/composables/shared/**'],
      dts: 'src/@types/auto-imports.d.ts',
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        {
          from: 'vue',
          imports: ['App', 'Slots'],
          type: true
        },
        {
          '@/apis': [['default', 'apis']],
          '@/constants': [['default', 'constants']],
          '@/utils': [['default', 'utils']]
        }
      ],
      resolvers: [ElementPlusResolver()],
      vueTemplate: true
    }),

    components({
      dirs: ['src/components/base/**'],
      dts: 'src/@types/components.d.ts',
      resolvers: [ElementPlusResolver()],
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView']
        }
      ]
    })
  ],

  preview: {
    host: '0.0.0.0',
    port: Number(process.env.VITE_PORT_PREVIEW) || 3030
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    host: '0.0.0.0',
    port: Number(process.env.VITE_PORT) || 3000
  }
});
