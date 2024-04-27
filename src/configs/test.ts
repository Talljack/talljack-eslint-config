import eslintPluginVitest from 'eslint-plugin-vitest'
import eslintPluginNoOnlyTest from 'eslint-plugin-no-only-tests'
import type { EslintFlatConfigItem, TestOptions } from '../types'
import { GLOB_TESTS } from '../globs'

const testsConfig: (options?: TestOptions) => EslintFlatConfigItem[] = (options: TestOptions = {}) => {
  const { files = [GLOB_TESTS], inEditor = false, overrides = {} } = options
  return [
    {
      name: 'vitest-setup',
      plugins: {
        vitest: eslintPluginVitest,
      },
    },
    {
      files,
      name: 'vitest-rules',
      rules: {
        ...eslintPluginVitest.configs.recommended.rules,
        ...eslintPluginNoOnlyTest.rules,
        'no-only-tests/no-only-tests': inEditor ? 'off' : 'error',
        'node/prefer-global/process': 'off',
        'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
        'vitest/prefer-hooks-in-order': 'error',
        'vitest/prefer-lowercase-title': 'error',
        ...overrides,
      },
    },
  ] as EslintFlatConfigItem[]
}

export default testsConfig
