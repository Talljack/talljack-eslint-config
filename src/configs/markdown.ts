import markdown from 'eslint-plugin-markdown'
import { GLOB_MARKDOWN, GLOB_MARKDOWN_IN_MARKDOWN } from '../globs'
import type { EslintFlatConfigItem, MarkdownOptions } from '../types'

const markdownConfig: (options: MarkdownOptions) => EslintFlatConfigItem[] = (options: MarkdownOptions = {}) => {
  const {
    files = [GLOB_MARKDOWN],
    overrides = {},
  } = options

  return [
    ...markdown.configs.recommended,
    // setup config
    {
      name: 'markdown-setup',
      plugins: {
        markdown,
      },
    },
    // processor markdown ignore files
    {
      files,
      ignores: [GLOB_MARKDOWN_IN_MARKDOWN],
      name: 'markdown-processor',
      processor: 'markdown/markdown',
    },
    // rules config
    {
      files,
      name: 'markdown-rules',
      rules: {
        ...overrides,
      },
    },
  ] as EslintFlatConfigItem[]
}

export default markdownConfig
