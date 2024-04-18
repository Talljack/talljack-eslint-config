import { default as pluginJsdoc } from 'eslint-plugin-jsdoc'
import type { CommentsOptions, EslintFlatConfigItem } from '../types'

const jsdocConfig: (options: CommentsOptions) => EslintFlatConfigItem[] = (options: CommentsOptions = {}) => {
  const { overrides = {} } = options
  return [
    {
      name: 'jsdoc-rules',
      plugins: {
        jsdoc: pluginJsdoc,
      },
      rules: {
        ...pluginJsdoc.configs['flat/recommended'].rules,
        ...overrides,
      },
    },
  ] as EslintFlatConfigItem[]
}

export default jsdocConfig
