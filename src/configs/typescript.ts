import tseslint from 'typescript-eslint'
import parserTs from '@typescript-eslint/parser'
import pluginTs from '@typescript-eslint/eslint-plugin'
import type { EslintFlatConfigItem, TypescriptOptions } from '../types'
import { toArray } from '../utils'
import { GLOB_TS, GLOB_TSX } from '../globs'

const typescriptConfig: (options: TypescriptOptions) => EslintFlatConfigItem[] = (options: TypescriptOptions = {}) => {
  const {
    overrides = {},
    parserOptions = {},
  } = options

  const files = [GLOB_TS, GLOB_TSX]

  const tsconfigPath = options?.tsconfigPath ? toArray(options.tsconfigPath) : undefined
  return [
    {
      name: 'typescript-setup',
      plugins: {
        ts: pluginTs,
      },
    },
    ...tseslint.configs.recommended,
    tsconfigPath
      ? {
          files,
          languageOptions: {
            parser: parserTs,
            parserOptions: {
              sourceType: 'module',
              project: tsconfigPath,
              tsconfigRootDir: process.cwd(),
              ...parserOptions,
            },
          },
        }
      : {},
    {
      files,
      name: 'typescript-rules',
      rules: {
        'no-dupe-class-members': 'off',
        'no-loss-of-precision': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'ts/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
        'ts/ban-types': ['error', { types: { Function: false } }],
        'ts/consistent-type-definitions': ['error', 'interface'],
        'ts/consistent-type-imports': ['error', { disallowTypeAnnotations: false, prefer: 'type-imports' }],
        'ts/method-signature-style': ['error', 'property'], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        'ts/no-dupe-class-members': 'error',
        'ts/no-dynamic-delete': 'off',
        'ts/no-explicit-any': 'off',
        'ts/no-extraneous-class': 'off',
        'ts/no-import-type-side-effects': 'error',
        'ts/no-invalid-void-type': 'off',
        'ts/no-loss-of-precision': 'error',
        'ts/no-non-null-assertion': 'off',
        'ts/no-redeclare': 'error',
        'ts/no-require-imports': 'error',
        'ts/no-unused-vars': 'off',
        'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        'ts/no-useless-constructor': 'off',
        'ts/prefer-ts-expect-error': 'error',
        'ts/triple-slash-reference': 'off',
        'ts/unified-signatures': 'off',
        ...overrides,
      },
    },
    {
      files: ['**/*.d.ts'],
      name: 'typescript-dts',
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      name: 'typescript-cjs',
      rules: {
        'ts/no-require-imports': 'off',
        'ts/no-var-requires': 'off',
      },
    },
    {
      files: ['**/*.{test,spec}.ts?(x)'],
      name: 'typescript-tests',
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ] as EslintFlatConfigItem[]
}

export default typescriptConfig
