// import sort from 'eslint-plugin-sort'
import { ensurePackages, interopDefault } from '../utils'
import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs'
import type { Awaitable, EslintFlatConfigItem, OptionsWithFilesAndOverrides } from '../types'

const sortConfig: (options?: OptionsWithFilesAndOverrides) => Awaitable<EslintFlatConfigItem[]> = async (options: OptionsWithFilesAndOverrides = {}) => {
  const {
    files = [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
    overrides = {},
  } = options

  await ensurePackages([
    'eslint-plugin-sort',
  ])

  const sort = await interopDefault(import('eslint-plugin-sort'))

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
