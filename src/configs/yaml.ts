import eslintPluginYml from 'eslint-plugin-yml'
import yamlParser from 'yaml-eslint-parser'
import type { EslintFlatConfigItem, YamlOptions } from '../types'
import { GLOB_YAML } from '../globs'

const yamlConfig: (options?: YamlOptions) => EslintFlatConfigItem[] = (options: YamlOptions = {}) => {
  const { files = [GLOB_YAML], overrides = {}, stylistic = true } = options
  const {
    indent = 2,
    quotes = 'single',
  } = typeof stylistic === 'boolean' ? {} : stylistic
  return [
    // recommended rules
    ...eslintPluginYml.configs['flat/recommended'],
    {
      name: 'comments-setup',
      plugins: {
        yaml: eslintPluginYml,
      },
    },
    {
      files,
      languageOptions: {
        parser: yamlParser,
      },
      name: 'yaml-rules',
      rules: {
        'yaml/block-mapping': 'error',
        ...stylistic
          ? {
              'yaml/block-mapping-question-indicator-newline': 'error',
              'yaml/block-sequence-hyphen-indicator-newline': 'error',
              'yaml/flow-mapping-curly-newline': 'error',
              'yaml/flow-mapping-curly-spacing': 'error',
              'yaml/flow-sequence-bracket-newline': 'error',
              'yaml/flow-sequence-bracket-spacing': 'error',
              'yaml/indent': ['error', indent === 'tab' ? 2 : indent],
              'yaml/key-spacing': 'error',
              'yaml/no-tab-indent': 'error',
              'yaml/quotes': ['error', { avoidEscape: false, prefer: quotes }],
              'yaml/spaced-comment': 'error',
            }
          : {},
        ...overrides,
      },
    },
  ] as EslintFlatConfigItem[]
}

export default yamlConfig
