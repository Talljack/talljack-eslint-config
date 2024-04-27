import eslintPluginAstro from 'eslint-plugin-astro'
import type { AstroOptions, EslintFlatConfigItem } from '../types'
import { GLOB_ASTRO } from '../globs'

const astroConfig: (options?: AstroOptions) => EslintFlatConfigItem[] = (options: AstroOptions = {}) => {
  const { files = [GLOB_ASTRO], overrides = {}, stylistic = true } = options
  return [
    ...eslintPluginAstro.configs.recommended,
    {
      files,
      name: 'astro-rules',
      rules: {
        'astro/no-set-html-directive': 'off',
        'astro/semi': 'off',
        ...(stylistic
          ? {
              '@stylistic/indent': 'off',
              '@stylistic/jsx-closing-tag-location': 'off',
              '@stylistic/jsx-indent': 'off',
              '@stylistic/jsx-one-expression-per-line': 'off',
              '@stylistic/no-multiple-empty-lines': 'off',
            }
          : {}),
        ...overrides,
      },
    },
  ] as EslintFlatConfigItem[]
}

export default astroConfig
