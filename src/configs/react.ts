import { GLOB_JSX, GLOB_TSX } from '../globs'
import type { Awaitable, EslintFlatConfigItem, ReactOptions } from '../types'
import { ensurePackages, interopDefault, toArray } from '../utils'

const reactConfig: (options?: ReactOptions) => Awaitable<EslintFlatConfigItem[]> = async (options: ReactOptions = {}) => {
  // TODO: https://github.com/jsx-eslint/eslint-plugin-react/issues/3699#issuecomment-2040983205
  const {
    files = [GLOB_TSX, GLOB_JSX],
    overrides = {},
  } = options

  await ensurePackages([
    '@eslint-react/eslint-plugin',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh',
  ])

  const tsconfigPath = options?.tsconfigPath
    ? toArray(options.tsconfigPath)
    : undefined

  const typeAware = !!tsconfigPath

  const [
    pluginReact,
    pluginReactHooks,
    pluginReactRefresh,
    parserTs,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-react')),
    interopDefault(import('eslint-plugin-react-hooks')),
    interopDefault(import('eslint-plugin-react-refresh')),
    interopDefault(import('@typescript-eslint/parser')),
  ])

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
