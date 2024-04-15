import { createEslintConfig } from './src'

export default createEslintConfig(
  {
    react: true,
    typescript: {
      overrides: {
        '@typescript-eslint/no-explicit-any': 'off',
      }
    },
  },
)
