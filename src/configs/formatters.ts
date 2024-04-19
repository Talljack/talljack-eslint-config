import type { DprintOptions, EslintFlatConfigItem, OptionsFormatters, PerttierOptions, StylisticConfig } from '../types'
import { GLOB_CSS, GLOB_GRAPHQL, GLOB_HTML, GLOB_LESS, GLOB_MARKDOWN, GLOB_POSTCSS, GLOB_SCSS } from '../globs'
import { ensurePackages, interopDefault } from '../utils'
import { stylisticDefaultConfig } from './stylistic'

const formatterConfig = async (options: OptionsFormatters | true = {}, stylistic: StylisticConfig = {}) => {
  if (options === true) {
    options = {
      css: true,
      graphql: true,
      html: true,
      markdown: true,
    }
  }
  await ensurePackages([
    'eslint-plugin-format',
  ])
  const {
    indent,
    quotes,
    semi,
  } = {
    ...stylisticDefaultConfig,
    ...stylistic,
  }
  // prettier config
  const prettierOptions: PerttierOptions = Object.assign(
    {
      endOfLine: 'auto',
      semi,
      singleQuote: quotes === 'single',
      tabWidth: typeof indent === 'number' ? indent : 2,
      trailingComma: 'all',
      useTabs: indent === 'tab',
    },
    options.prettierOptions || {},
  )
  // dprint config
  const dprintOptions: DprintOptions = Object.assign(
    {
      indentWidth: typeof indent === 'number' ? indent : 2,
      quoteStyle: quotes === 'single' ? 'preferSingle' : 'perferDouble',
      useTabs: indent === 'tab',
    },
    options.dprintOptions || {},
  )
  const format = await interopDefault(import('eslint-plugin-format'))
  const configs: EslintFlatConfigItem[] = [
    {
      name: 'formatter-setup',
      plugins: {
        format,
      },
    },
  ]
  // css
  if (options.css) {
    configs.push(
      {
        files: [GLOB_CSS, GLOB_POSTCSS],
        languageOptions: {
          parser: format.parserPlain,
        },
        name: 'formatter-css',
        rules: {
          'format/perttier': [
            'error',
            {
              ...prettierOptions,
              parser: 'css',
            },
          ],
        },
      },
      {
        files: [GLOB_SCSS],
        languageOptions: {
          parser: format.parserPlain,
        },
        name: 'formatter-scss',
        rules: {
          'format/perttier': [
            'error',
            {
              ...prettierOptions,
              parser: 'scss',
            },
          ],
        },
      },
      {
        files: [GLOB_LESS],
        languageOptions: {
          parser: format.parserPlain,
        },
        name: 'formatter-less',
        rules: {
          'format/perttier': [
            'error',
            {
              ...prettierOptions,
              parser: 'less',
            },
          ],
        },
      },
    )
  }
  // html
  if (options.html) {
    configs.push(
      {
        files: [GLOB_HTML],
        languageOptions: {
          parser: format.parserPlain,
        },
        name: 'formatter-html',
        rules: {
          'format/perttier': [
            'error',
            {
              ...prettierOptions,
              parser: 'html',
            },
          ],
        },
      },
    )
  }
  // markdown
  if (options.markdown) {
    const formater = options.markdown === true ? 'prettier' : options.markdown
    configs.push(
      {
        files: [GLOB_MARKDOWN],
        languageOptions: {
          parser: format.parserPlain,
        },
        name: 'formatter-markdown',
        rules: {
          [`format/${formater}`]: [
            'error',
            formater === 'prettier'
              ? {
                  printWidth: 120,
                  ...prettierOptions,
                  embeddedLanguageFormatting: 'off',
                  parser: 'markdown',
                }
              : {
                  ...dprintOptions,
                  language: 'markdown',
                },
          ],
        },
      },
    )
  }
  // graphql
  if (options.graphql) {
    configs.push(
      {
        files: [GLOB_GRAPHQL],
        languageOptions: {
          parser: format.parserPlain,
        },
        name: 'formatter-graphql',
        rules: {
          'format/perttier': [
            'error',
            {
              ...prettierOptions,
              parser: 'graphql',
            },
          ],
        },
      },
    )
  }
  return configs
}

export default formatterConfig
