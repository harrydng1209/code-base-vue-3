import jsLint from '@eslint/js';
import configPrettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import vueLint from 'eslint-plugin-vue';
import globals from 'globals';
import tsLint from 'typescript-eslint';

import globalsrc from './.globalsrc.json' with { type: 'json' };

export default [
  {
    ignores: [
      '**/.git/',
      '**/.husky/',
      '**/dist/',
      '**/node_modules/',
      '**/pnpm-lock.yaml',
      'src/@types/',
    ],
  },

  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  ...vueLint.configs['flat/essential'],
  perfectionist.configs['recommended-natural'],
  configPrettier,

  {
    files: ['**/*.{cjs,cts,mjs,mts,js,jsx,ts,tsx,vue}'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globalsrc.globals,
      },
      parserOptions: {
        parser: tsLint.parser,
        sourceType: 'module',
      },
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      'eol-last': ['error', 'always'],

      'no-console': [
        'warn',
        {
          allow: ['error', 'info'],
        },
      ],

      'vue/attribute-hyphenation': ['error', 'never'],

      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          ignores: [],
          registeredComponentsOnly: false,
        },
      ],

      'vue/multi-word-component-names': 'off',
      'vue/prop-name-casing': ['error', 'camelCase'],
    },
  },
];
