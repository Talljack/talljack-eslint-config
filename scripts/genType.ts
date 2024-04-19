import fs from 'node:fs/promises'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import {
  combineConfigs,
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
} from '../src/'

const configs = await combineConfigs(
  [{
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  }],
  commentsConfig(),
  formatterConfig(),
  ignoresConfig(),
  importsConfig(),
  javascriptConfig(),
  jsdocConfig(),
  jsoncConfig(),
  markdownConfig(),
  nodeConfig(),
  reactConfig(),
  sortConfig(),
  sortPackageJsonConfig(),
  sortTsConfigJsonConfig(),
  stylisticConfig(),
  typescriptConfig(),
  vueConfig(),
  yamlConfig(),
)

const configNames = configs.map(item => item.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

dts += `
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await fs.writeFile('src/genType.d.ts', dts)
