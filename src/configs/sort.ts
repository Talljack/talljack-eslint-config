import sort from 'eslint-plugin-sort'
import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs'
import type { EslintFlatConfigItem, OptionsWithFilesAndOverrides } from '../types'

const sortConfig: (options: OptionsWithFilesAndOverrides) => EslintFlatConfigItem[] = (options: OptionsWithFilesAndOverrides = {}) => {
  const {
    files = [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
    overrides = {},
  } = options

  return [
    sort.configs['flat/recommended'],
    // setup config
    {
      name: 'sort-setup',
      plugins: {
        sort,
      },
    },
    // rules config
    {
      files,
      name: 'sort-rules',
      rules: {
        'sort/imports': 'off',
        ...overrides,
      },
    },
  ] as EslintFlatConfigItem[]
}

export default sortConfig
