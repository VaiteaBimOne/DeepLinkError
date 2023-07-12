module.exports = {
  env: {
    'jest/globals': true,
  },
  extends: ['@react-native-community', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['*.js', '*.ts', '*.jsx', '*.tsx'],
      rules: {
        'jsx-quotes': 0,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'testing-library', 'sort-keys-fix'],
  root: true,
  rules: {
    '@typescript-eslint/no-empty-function': [0],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
    'no-console': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            importNames: ['SafeAreaView'],
            message: 'Import SafeAreaView from react-native-safe-area-context instead',
            name: 'react-native',
          },
          {
            importNames: ['SafeAreaView'],
            message: 'Import SafeAreaView from react-native-safe-area-context instead',
            name: 'react-navigation',
          },
          {
            importNames: ['SafeAreaView'],
            message: 'Import SafeAreaView from react-native-safe-area-context instead',
            name: 'react-native-safe-area-view',
          },
          {
            importNames: ['useDispatch'],
            message: 'use useAppDispatch from store.ts',
            name: 'react-redux',
          },
          {
            importNames: ['ScrollView'],
            message: 'Import ScrollView from react-native instead',
            name: 'react-native-gesture-handler',
          },
          {
            message: 'Please import from styled-components/native.',
            name: 'styled-components',
          },
          {
            message: 'Please import the abstraction BackgroundServer',
            name: 'react-native-background-actions',
          },
        ],
        patterns: ['!styled-components/native'],
      },
    ],
    'no-shadow': [0],
    'react-native/no-inline-styles': [0],
    'sort-keys-fix/sort-keys-fix': 'error',
    'testing-library/await-async-query': 'error',
    'testing-library/await-async-utils': 'error',
    'testing-library/no-wait-for-side-effects': 'error',
  },
};
