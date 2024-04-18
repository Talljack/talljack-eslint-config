import { default as pluginStylistic } from '@stylistic/eslint-plugin'
import type { EslintFlatConfigItem, StylisticOptions } from '../types'

const stylisticDefaultConfig: StylisticOptions['stylistic'] = {
  arrowParens: false,
  commaDangle: 'always-multiline',
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false,
}

const stylisticConfig: (options: StylisticOptions) => EslintFlatConfigItem[] = (options: StylisticOptions = {}) => {
  const {
    arrowParens,
    commaDangle,
    indent,
    jsx,
    overrides = {},
    quotes,
    semi,
  } = {
    ...stylisticDefaultConfig,
    ...options,
  }
  const config = pluginStylistic.configs.customize({
    arrowParens,
    commaDangle,
    indent,
    jsx,
    quotes,
    semi,
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
