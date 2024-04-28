import js from '@eslint/js'
import type { EslintFlatConfigItem, SolidOptions } from '../types'
import { GLOB_JSX, GLOB_TSX } from '../globs'
import { ensurePackagesInstalled, interopDefault, toArray } from '../utils'

const solidConfig = async (options: SolidOptions = {}): Promise<EslintFlatConfigItem[]> => {
  const { files = [GLOB_TSX, GLOB_JSX], overrides = {}, typescript = true } = options

  await ensurePackagesInstalled(['eslint-plugin-solid'])
  const [
    eslintPluginSolid,
    parserTs,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-solid')),
    interopDefault(import('@typescript-eslint/parser')),
  ])
  const tsconfigPath = options?.tsconfigPath ? toArray(options.tsconfigPath) : undefined

  return [
    js.configs.recommended,
    {
      name: 'solid-setup',
      plugins: {
        solid: eslintPluginSolid,
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
          ...tsconfigPath ? { project: tsconfigPath } : {},
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      name: 'solid-rules',
      rules: {
        ...typescript ? eslintPluginSolid.configs.typescript.rules : eslintPluginSolid.configs.recommended.rules,
        'solid/imports': 'error',
        'solid/jsx-no-undef': 'error',
        'solid/no-unknown-namespaces': 'error',
        'solid/style-prop': ['error', { styleProps: ['style', 'css'] }],
        ...overrides,
      },
    },
  ] as EslintFlatConfigItem[]
}

export default solidConfig
