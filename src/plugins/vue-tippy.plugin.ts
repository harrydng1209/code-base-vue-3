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

const vueTippyPlugin = {
  install(app: App) {
    app.use(vueTippy, options);
  },
};

export default vueTippyPlugin;
