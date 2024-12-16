import type { App } from 'vue';

import vueTippy from 'vue-tippy';

const vueTippyPlugin = {
  install(app: App) {
    app.use(vueTippy, {
      component: 'tippy',
      componentSingleton: 'tippy-singleton',
      defaultProps: {
        allowHTML: true,
        duration: [200, 200],
        placement: 'top',
        theme: 'material'
      },
      directive: 'tippy'
    });
  }
};

export default vueTippyPlugin;
