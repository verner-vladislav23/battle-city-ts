const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
}
