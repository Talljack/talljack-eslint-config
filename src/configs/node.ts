import { default as pluginNode } from 'eslint-plugin-n'
import type { EslintFlatConfigItem } from '../types'

const nodeConfig: () => EslintFlatConfigItem[] = () => {
  return [
    {
      name: 'node-rules',
      plugins: {
        n: pluginNode,
      },
      rules: {
        'n/callback-return': ['error', ['err', 'error']],
        'n/no-deprecated-api': 'error',
        'n/no-exports-assign': 'error',
        'n/no-new-require': 'error',
        'n/no-path-concat': 'error',
        'n/prefer-global/process': ['error', 'always'],
        'n/prefer-global/buffer': ['error', 'always'],
        'n/process-exit-as-throw': 'error',
      },
    },
  ] as EslintFlatConfigItem[]
}

export default nodeConfig
