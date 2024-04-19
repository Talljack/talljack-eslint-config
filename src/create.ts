import fs from 'node:fs'
import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { isPackageExists } from 'local-pkg'
import {
  commentsConfig,
  formatterConfig,
  ignoresConfig,
  importsConfig,
  javascriptConfig,
  jsdocConfig,
  jsoncConfig,
  markdownConfig,
  nodeConfig,
  reactConfig,
  sortConfig,
  sortPackageJsonConfig,
  sortTsConfigJsonConfig,
  stylisticConfig,
  typescriptConfig,
  vueConfig,
  yamlConfig,
} from './configs'
import type { Awaitable, EslintFlatConfigItem, JavascriptOptions, OptionsConfig, ReactOptions, TypescriptOptions } from './types'
import { getOverrides, interopDefault, resolveSubOptions } from './utils'

export const createEslintConfig = (options: OptionsConfig, ...userConfigs: EslintFlatConfigItem[]) => {
  const {
    enableGitignore = true,
    inEditor = !!((process.env.VSCODE_PID || process.env.VSCODE_CWD || process.env.JETBRAINS_IDE || process.env.VIM) && !process.env.CI),
    jsonc,
    markdown,
    react,
    sort = false,
    typescript = isPackageExists('typescript'),
    vue,
  } = options

  const stylistic = options.stylistic === false ? false : typeof options.stylistic === 'object' ? options.stylistic : {}
  const configs: Awaitable<EslintFlatConfigItem[]>[] = []

  if (enableGitignore) {
    if (typeof enableGitignore !== 'boolean') {
      configs.push(interopDefault(import('eslint-config-flat-gitignore')).then(r => [r(enableGitignore)]))
    }
    else {
      if (fs.existsSync('.gitignore'))
        configs.push(interopDefault(import('eslint-config-flat-gitignore')).then(r => [r()]))
    }
  }

  configs.push(ignoresConfig())
  configs.push(commentsConfig({
    overrides: getOverrides(options, 'comments'),
  }))
  configs.push(nodeConfig())
  configs.push(jsdocConfig({
    overrides: getOverrides(options, 'jsdoc'),
  }))
  configs.push(importsConfig({
    stylistic,
  }))
  configs.push(javascriptConfig({
    inEditor,
    overrides: getOverrides(options, 'javascript') as JavascriptOptions['overrides'],
  }))
  if (typescript) {
    configs.push(typescriptConfig({
      ...resolveSubOptions(options, 'typescript'),
      overrides: getOverrides(options, 'typescript') as TypescriptOptions['overrides'],
    }))
  }
  if (sort) {
    configs.push(sortConfig({
      ...resolveSubOptions(options, 'sort'),
      overrides: getOverrides(options, 'sort'),
    }))
  }
  if (react) {
    configs.push(reactConfig({
      ...resolveSubOptions(options, 'react'),
      overrides: getOverrides(options, 'react') as ReactOptions['overrides'],
      typescript: !!typescript,
    }))
  }
  if (vue) {
    configs.push(vueConfig({
      ...resolveSubOptions(options, 'vue'),
      overrides: getOverrides(options, 'vue') as ReactOptions['overrides'],
      typescript: !!typescript,
    }))
  }
  // markdown
  if (markdown ?? true) {
    configs.push(markdownConfig({
      overrides: getOverrides(options, 'markdown'),
    }))
  }
  // yaml
  if (options.yaml) {
    configs.push(yamlConfig({
      ...resolveSubOptions(options, 'yaml'),
      overrides: getOverrides(options, 'yaml'),
      stylistic,
    }))
  }
  // jsonc
  if (jsonc ?? true) {
    configs.push(
      jsoncConfig({
        overrides: getOverrides(options, 'jsonc'),
        stylistic,
      }),
      sortPackageJsonConfig(),
      sortTsConfigJsonConfig(),
    )
  }
  // stylistic
  if (stylistic) {
    configs.push(
      stylisticConfig({
        ...stylistic,
        overrides: getOverrides(options, 'stylistic'),
      }),
    )
  }
  // formatters
  if (options.formatters) {
    configs.push(
      formatterConfig(
        options.formatters,
        typeof stylistic === 'object' ? stylistic : {},
      ),
    )
  }
  if (userConfigs.length)
    configs.push(userConfigs)

  const composer = new FlatConfigComposer(...configs)
  return composer
}
