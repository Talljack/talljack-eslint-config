import fs from 'node:fs'
import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { isPackageExists } from 'local-pkg'
import {
  commentsConfig,
  ignoresConfig,
  importsConfig,
  javascriptConfig,
  markdownConfig,
  nodeConfig,
  reactConfig,
  typescriptConfig,
  vueConfig
} from './configs'
import type { EslintFlatConfigItem, JavascriptOptions, OptionsConfig, ReactOptions, TypescriptOptions } from './types'
import { getOverrides, interopDefault, resolveSubOptions } from './utils'

export const createEslintConfig = (options: OptionsConfig, ...userConfigs: EslintFlatConfigItem[]) => {
  const {
    typescript = isPackageExists('typescript'),
    react,
    vue,
    markdown,
    inEditor = !!((process.env.VSCODE_PID || process.env.VSCODE_CWD || process.env.JETBRAINS_IDE || process.env.VIM) && !process.env.CI),
    enableGitignore = true
  } = options
  const configs: EslintFlatConfigItem[] = []

  if (enableGitignore) {
    if (typeof enableGitignore !== 'boolean') {
      configs.push(interopDefault(import('eslint-config-flat-gitignore')).then(r => [r(enableGitignore)]) as EslintFlatConfigItem)
    } else {
      if (fs.existsSync('.gitignore')) {
        configs.push(interopDefault(import('eslint-config-flat-gitignore')).then(r => [r()]) as EslintFlatConfigItem)
      }
    }
  }

  configs.push(...ignoresConfig())
  configs.push(...commentsConfig({
    overrides: getOverrides(options, 'comments'),
  }))
  configs.push(...nodeConfig())
  configs.push(...importsConfig({
    stylistic: options.stylistic
  }))
  configs.push(...javascriptConfig({
    inEditor,
    overrides: getOverrides(options, 'javascript') as JavascriptOptions['overrides']
  }))
  if (typescript) {
    configs.push(...typescriptConfig({
      ...resolveSubOptions(options, 'typescript'),
      overrides: getOverrides(options, 'typescript') as TypescriptOptions['overrides']
    }))
  }
  if (react) {
    configs.push(...reactConfig({
      ...resolveSubOptions(options, 'react'),
      typescript: !!typescript,
      overrides: getOverrides(options, 'react') as ReactOptions['overrides']
    }))
  }
  if (vue) {
    configs.push(vueConfig({
      ...resolveSubOptions(options, 'vue'),
      typescript: !!typescript,
      overrides: getOverrides(options, 'vue') as ReactOptions['overrides']
    }) as EslintFlatConfigItem)
  }
  // markdown
  if (markdown ?? true) {
    configs.push(...markdownConfig({
      overrides: getOverrides(options, 'markdown')
    }))
  }
  if (userConfigs.length) {
    configs.push(...userConfigs)
  }
  const composer = new FlatConfigComposer(configs)
  return composer
}
