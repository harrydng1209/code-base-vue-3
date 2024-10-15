const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'type-enum': [
      2,
      'always',
      ['fix', 'feat', 'chore', 'docs', 'style', 'refactor', 'perf', 'test']
    ],
    'subject-case': [2, 'always', ['lower-case']],
    'type-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'scope-enum': [1, 'always', []]
  }
};

export default commitlintConfig;
