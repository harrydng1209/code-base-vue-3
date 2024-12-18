import type { App } from 'vue';

import vueTippy from 'vue-tippy';

const tippyOptions = {
  component: 'tippy',
  componentSingleton: 'tippy-singleton',
  defaultProps: {
    allowHTML: true,
    duration: [200, 200],
    placement: 'top',
    theme: 'material'
  },
  directive: 'tippy'
};

const vueTippyPlugin = {
  install(app: App) {
    app.use(vueTippy, tippyOptions);
  }
};

export default vueTippyPlugin;
