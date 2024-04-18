import createEslintConfig from './src'

export default createEslintConfig(
  {
    javascript: true,
    jsonc: true,
    markdown: true,
    react: true,
    sort: true,
    stylistic: true,
    typescript: {
      overrides: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    vue: true,
  },
)
