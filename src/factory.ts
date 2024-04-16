import {
  reactConfig,
  typescriptConfig
} from './configs'

import type { EslintFlatConfigItem, OptionsConfig, ReactOptions, TypescriptOptions } from './types'
import { getOverrides, resolveSubOptions } from './utils'
import ignores from './configs/ignores'

export const createEslintConfig = (options: OptionsConfig, ...userConfigs: EslintFlatConfigItem[]) => {
  const {typescript, react} = options
  const config: EslintFlatConfigItem[] = []

  config.push(...ignores())
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
  return config
}
