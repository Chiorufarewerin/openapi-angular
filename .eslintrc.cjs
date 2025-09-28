module.exports = {
  root: true,
  ignorePatterns: ['**/dist/**', '**/node_modules/**', 'vitest.config.ts', 'vitest.setup.ts'],
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: [
          './tsconfig.json',
          './projects/**/tsconfig.app.json',
          './projects/**/tsconfig.lib.json',
          './projects/**/tsconfig.spec.json',
        ],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      plugins: [
        '@typescript-eslint',
        '@angular-eslint',
        'import',
        'rxjs',
        'rxjs-angular',
        'simple-import-sort',
        'import',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@angular-eslint/recommended',
        'plugin:import/recommended',
        'eslint-config-prettier',
      ],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'rxjs/no-ignored-subscription': 'warn',
        'rxjs-angular/prefer-takeuntil': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/order': 'off',
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['**/*.spec.ts', '**/*.test.ts', '**/test/testing.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['**/*.html'],
      parser: '@angular-eslint/template-parser',
      plugins: ['@angular-eslint/template'],
      extends: ['plugin:@angular-eslint/template/recommended'],
    },
  ],
};
