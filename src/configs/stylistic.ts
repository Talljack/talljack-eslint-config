import { default as pluginStylistic } from '@stylistic/eslint-plugin'
import type { EslintFlatConfigItem, StylisticOptions } from '../types'

const stylisticDefaultConfig: StylisticOptions['stylistic'] = {
  jsx: true,
  indent: 2,
  quotes: 'single',
  semi: false,
  arrowParens: false,
  commaDangle: 'always-multiline',
}

const stylisticConfig: (options: StylisticOptions) => EslintFlatConfigItem[] = (options: StylisticOptions = {}) => {
  const {
    overrides = {},
    jsx,
    indent,
    quotes,
    semi,
    commaDangle,
    arrowParens,
  } = {
    ...stylisticDefaultConfig,
    ...options,
  }
  const config = pluginStylistic.configs.customize({
    jsx,
    indent,
    quotes,
    semi,
    arrowParens,
    commaDangle,
  },
  )
  return [
    {
      name: 'stylistic-rules',
      plugins: {
        '@stylistic': pluginStylistic,
      },
      rules: {
        ...config.rules,
        curly: ['error', 'multi-or-nest', 'consistent'],
        ...overrides,
      },
    },
  ] as EslintFlatConfigItem[]
}

export default stylisticConfig
