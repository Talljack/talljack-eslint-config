import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import parserTs from '@typescript-eslint/parser'
import { GLOB_JSX, GLOB_TSX } from '../globs'
import type { EslintFlatConfigItem, ReactOptions } from '../types'
import { toArray } from '../utils'

const reactConfig: (options: ReactOptions) => EslintFlatConfigItem[] = (options: ReactOptions = {}) => {
  // TODO: https://github.com/jsx-eslint/eslint-plugin-react/issues/3699#issuecomment-2040983205
  const {
    files = [GLOB_TSX, GLOB_JSX],
    overrides = {},
  } = options

  const tsconfigPath = options?.tsconfigPath
    ? toArray(options.tsconfigPath)
    : undefined

  const typeAware = !!tsconfigPath

  return [
    {
      name: 'react-setup',
      plugins: {
        'react': pluginReact,
        'react-hooks': pluginReactHooks,
        'react-refresh': pluginReactRefresh,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ...typeAware ? { project: tsconfigPath } : {},
        },
        sourceType: 'module',
      },
      name: 'react-rules',
      rules: {
        ...pluginReact.configs.recommended.rules,
        ...pluginReactHooks.configs.recommended.rules,
        ...typeAware
          ? {
              'react/no-leaked-conditional-rendering': 'warn',
            }
          : {},
        ...overrides,
      },
    },
  ] as EslintFlatConfigItem[]
}

export default reactConfig
