import '@/assets/styles/root/main.scss';

import App from '@/App.vue';
import { createPinia } from 'pinia';
import routerPlugin from '@/plugins/router.plugin';
import i18nPlugin from '@/plugins/i18n.plugin';
import tippyPlugin from '@/plugins/tippy.plugin';

const app = createApp(App);

app.use(createPinia());
app.use(routerPlugin);
app.use(i18nPlugin);
app.use(tippyPlugin);

app.mount('#app');
