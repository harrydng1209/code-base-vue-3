import '@/assets/styles/root/main.scss';

import App from '@/App.vue';
import { createPinia } from 'pinia';
import vueRouterPlugin from '@/plugins/vue-router.plugin';
import vueI18nPlugin from '@/plugins/vue-i18n.plugin';
import vueTippyPlugin from '@/plugins/vue-tippy.plugin';

const app = createApp(App);

app.use(createPinia());
app.use(vueRouterPlugin);
app.use(vueI18nPlugin);
app.use(vueTippyPlugin);

app.mount('#app');
