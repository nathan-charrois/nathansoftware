import stylistic from '@stylistic/eslint-plugin'
import n from 'eslint-plugin-n'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default [
  ...tseslint.configs.recommended,
  stylistic.configs.recommended,
  n.configs.recommended,
  {
    ignores: [
      '**/build/**',
      '**/node_modules/**',
      '**/.react-router/**',
      '**/public/**',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error', {
          groups: [['^react', '^@?\\w'], ['^\\u0000']],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['server/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./server/tsconfig.json'],
      },
    },
    rules: {
      // Add or override specific rules for server if needed
      // Example: '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]
