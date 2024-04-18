import { default as pluginComments } from 'eslint-plugin-eslint-comments'

import type { CommentsOptions, EslintFlatConfigItem } from '../types'

const commentsConfig: (options: CommentsOptions) => EslintFlatConfigItem[] = (options: CommentsOptions = {}) => {
  const { overrides = {} } = options
  return [
    {
      name: 'comments-rules',
      plugins: {
        'eslint-comments': pluginComments,
      },
      // link: https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-unused-enable.html
      rules: {
        ...pluginComments.configs.recommended.rules,
        ...overrides,
      },
    },
  ] as EslintFlatConfigItem[]
}

export default commentsConfig
