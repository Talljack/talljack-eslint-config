import fs from 'node:fs'
import {
  ignoresConfig,
  javascriptConfig,
  reactConfig,
  typescriptConfig
} from './configs'
import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { isPackageExists } from 'local-pkg'
import type { EslintFlatConfigItem, JavascriptOptions, OptionsConfig, ReactOptions, TypescriptOptions } from './types'
import { getOverrides, interopDefault, resolveSubOptions } from './utils'

export const createEslintConfig = (options: OptionsConfig, ...userConfigs: EslintFlatConfigItem[]) => {
  const {
    typescript = isPackageExists('typescript'),
    react,
    inEditor = !!((process.env.VSCODE_PID || process.env.VSCODE_CWD || process.env.JETBRAINS_IDE || process.env.VIM) && !process.env.CI),
    enableGitignore = true
  } = options
  const config: EslintFlatConfigItem[] = []

  if (enableGitignore) {
    if (typeof enableGitignore !== 'boolean') {
      config.push(interopDefault(import('eslint-config-flat-gitignore')).then(r => [r(enableGitignore)]) as EslintFlatConfigItem)
    } else {
      if (fs.existsSync('.gitignore')) {
        config.push(interopDefault(import('eslint-config-flat-gitignore')).then(r => [r()]) as EslintFlatConfigItem)
      }
    }
  }

  config.push(...ignoresConfig())
  config.push(...javascriptConfig({
    inEditor,
    overrides: getOverrides(options, 'javascript') as JavascriptOptions['overrides']
  }))
  if (typescript) {
    config.push(...typescriptConfig({
      ...resolveSubOptions(options, 'typescript'),
      overrides: getOverrides(options, 'typescript') as TypescriptOptions['overrides']
    }))
  }
  if (react) {
    config.push(...reactConfig({
      ...resolveSubOptions(options, 'react'),
      typescript: !!typescript,
      overrides: getOverrides(options, 'react') as ReactOptions['overrides']
    }))
  }
  if (userConfigs.length) {
    config.push(...userConfigs)
  }
  const composer = new FlatConfigComposer(config)
  return composer
}
