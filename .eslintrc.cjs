// Pre-commit / lint-staged config — no type-checking (too slow for 100+ files).
// For full type-aware linting run: npm run lint:types
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: { node: true, jest: true },
  ignorePatterns: ['.eslintrc.cjs', 'dist/**', 'node_modules/**', 'src/generated/**'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
        tabWidth: 2,
        semi: true,
      },
    ],
  },
  overrides: [
    {
      // Type-aware rules — only active when project is provided (npm run lint:types)
      files: ['src/**/*.ts'],
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
  ],
};
