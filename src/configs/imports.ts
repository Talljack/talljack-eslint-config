import { default as pluginImport } from 'eslint-plugin-import-x'
import type { EslintFlatConfigItem, OptionsWithStylistics } from '../types'

const importsConfig: (options: OptionsWithStylistics) => EslintFlatConfigItem[] = (options: OptionsWithStylistics = {}) => {
  const { stylistic = true } = options
  return [
    {
      name: 'imports-rules',
      plugins: {
        import: pluginImport,
      },
      rules: {
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-self-import': 'error',
        'import/order': 'error',
        'import/no-webpack-loader-syntax': 'error',

        ...stylistic
          ? {
              'import/newline-after-import': ['error', { count: 1 }],
            }
          : {},
      },
    },
  ] as EslintFlatConfigItem[]
}

export default importsConfig
