import { default as eslint } from '@eslint/js'
import { default as pluginUnusedImports } from 'eslint-plugin-unused-imports'
import globals from 'globals'
import type { EslintFlatConfigItem, JavascriptOptions } from '../types'

const javascriptConfig: (options?: JavascriptOptions) => EslintFlatConfigItem[] = (options: JavascriptOptions = {}) => {
  const {
    inEditor = false,
    overrides = {},
  } = options

  return [
    eslint.configs.recommended,
    {
      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.es2021,
          // readonly
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 'latest',
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      name: 'javascript-rules',
      plugins: {
        'unused-imports': pluginUnusedImports,
      },
      rules: {
        'accessor-pairs': ['error', { enforceForClassMembers: true, setWithoutGet: true }],
        'block-scoped-var': 'error',
        'default-case-last': 'error',
        'dot-notation': ['error', { allowKeywords: true }],
        'eqeqeq': ['error', 'smart'],
        'new-cap': ['error', { capIsNew: false, newIsCap: true, properties: true }],
        'no-array-constructor': 'error',
        'no-caller': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-eval': 'error',
        'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
        'no-redeclare': ['error', { builtinGlobals: false }],
        'no-restricted-globals': [
          'error',
          { message: 'Use `globalThis` instead.', name: 'global' },
          { message: 'Use `globalThis` instead.', name: 'self' },
        ],
        'no-restricted-properties': [
          'error',
          { message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.', property: '__proto__' },
          { message: 'Use `Object.defineProperty` instead.', property: '__defineGetter__' },
          { message: 'Use `Object.defineProperty` instead.', property: '__defineSetter__' },
          { message: 'Use `Object.getOwnPropertyDescriptor` instead.', property: '__lookupGetter__' },
          { message: 'Use `Object.getOwnPropertyDescriptor` instead.', property: '__lookupSetter__' },
        ],
        'no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
          'TSEnumDeclaration[const=true]',
          'TSExportAssignment',
        ],
        'no-self-assign': ['error', { props: true }],
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],
        'no-unreachable-loop': 'error',
        'no-unused-expressions': ['error', {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        }],
        'no-unused-vars': ['error', {
          args: 'none',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          vars: 'all',
        }],
        'no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        'object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],
        'one-var': ['error', { initialized: 'never' }],
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true,
          },
        ],
        'prefer-const': [
          'error',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true,
          },
        ],
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        'sort-imports': [
          'error',
          {
            allowSeparatedGroups: false,
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          },
        ],
        'unused-imports/no-unused-imports': inEditor ? 'off' : 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
        'use-isnan': ['error', { enforceForIndexOf: true, enforceForSwitchCase: true }],
        'valid-typeof': ['error', { requireStringLiterals: true }],
        ...overrides,
      },
    },
  ] as EslintFlatConfigItem[]
}

export default javascriptConfig
