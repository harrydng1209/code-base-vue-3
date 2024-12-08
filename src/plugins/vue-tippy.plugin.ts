import vueTippy from 'vue-tippy';
import type { App } from 'vue';

const vueTippyPlugin = {
  install(app: App) {
    app.use(vueTippy, {
      directive: 'tippy',
      component: 'tippy',
      componentSingleton: 'tippy-singleton',
      defaultProps: {
        placement: 'top',
        allowHTML: true,
        theme: 'material',
        duration: [200, 200]
      }
    });
  }
};

export default vueTippyPlugin;
