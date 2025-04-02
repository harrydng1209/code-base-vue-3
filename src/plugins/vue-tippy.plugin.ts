import vueTippy from 'vue-tippy';

const options = {
  component: 'tippy',
  componentSingleton: 'tippy-singleton',
  defaultProps: {
    allowHTML: true,
    duration: [200, 200],
    placement: 'top',
    theme: 'material',
  },
  directive: 'tippy',
};

export const vueTippyPlugin = {
  install(app: App) {
    app.use(vueTippy, options);
  },
};
