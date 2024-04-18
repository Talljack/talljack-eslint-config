import createEslintConfig from './src'

export default createEslintConfig(
  {
    javascript: true,
    react: true,
    vue: true,
    markdown: true,
    jsonc: true,
    typescript: {
      overrides: {
        '@typescript-eslint/no-explicit-any': 'off',
      }
    },
  },
)
