import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import promisePlugin from 'eslint-plugin-promise';
import securityPlugin from 'eslint-plugin-security';

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      import: importPlugin,
      promise: promisePlugin,
      security: securityPlugin,
    },
    rules: {
      // Import rules
      'import/order': ['warn', { alphabetize: { order: 'asc', caseInsensitive: true } }],
      'import/no-unresolved': 'error',
      'import/newline-after-import': 'warn',
      // Promise rules
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'warn',
      'promise/param-names': 'warn',
      'promise/catch-or-return': 'warn',
      // Security rules
      'security/detect-object-injection': 'off',
      'security/detect-non-literal-fs-filename': 'warn',
      // General best practices
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prefer-const': 'warn',
      'no-var': 'error',
      'no-console': 'warn',
      // Prettier integration
      'prettier/prettier': 'warn',
    },
  },
];
