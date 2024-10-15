import plugin from 'tailwindcss/plugin';

const tailwindConfig = {
  prefix: 'tw-',
  content: ['./src/**/*.{html,vue,ts}'],
  theme: {
    extend: {}
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.flex-center': {
          '@apply tw-flex tw-justify-center tw-items-center': {}
        }
      };

      addUtilities(newUtilities);
    })
  ]
};

export default tailwindConfig;
