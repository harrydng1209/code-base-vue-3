import '@/assets/styles/root/main.scss';
import App from '@/App.vue';
import { caslVuePlugin } from '@/plugins/casl-vue.plugin';
import { vueI18nPlugin } from '@/plugins/vue-i18n.plugin';
import { vueRouterPlugin } from '@/plugins/vue-router.plugin';
import { vueTippyPlugin } from '@/plugins/vue-tippy.plugin';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(createPinia());
app.use(caslVuePlugin);
app.use(vueI18nPlugin);
app.use(vueRouterPlugin);
app.use(vueTippyPlugin);

app.mount('#app');
