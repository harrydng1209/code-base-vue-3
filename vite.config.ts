import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import autoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  server: {
    port: Number(process.env.VITE_PORT) || 3000,
    host: '0.0.0.0'
  },
  preview: {
    port: Number(process.env.VITE_PORT_PREVIEW) || 3030,
    host: '0.0.0.0'
  },
  plugins: [
    vue(),
    vueDevTools(),
    autoImport({
      vueTemplate: true,
      dirs: ['src/composables/**'],
      dts: 'src/@types/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        {
          '@/constants': [['default', 'constants']],
          '@/utils': [['default', 'utils']],
          '@/apis': [['default', 'apis']],
          'string-template': [['default', 'stringFormat']]
        }
      ]
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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/styles/root/variables.scss";
          @import "./src/assets/styles/root/mixins.scss";
        `
      }
    }
  }
});
