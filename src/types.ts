import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { ParserOptions } from '@typescript-eslint/parser'
import type { Linter } from 'eslint'
import type { ConfigNames, RuleOptions } from './genType.d'

export type Awaitable<T> = T | Promise<T>

export type { ConfigNames }

export interface PrettierOptionsRequired {
}

export type PerttierOptions = Partial<PrettierOptionsRequired>

export type EslintFlatConfigItem = Omit<Linter.FlatConfig<Linter.RulesRecord & RuleOptions>, 'plugins'> & {
  plugins?: Record<string, any>
}

export interface OptionsHasTypescript {
  typescript?: boolean
}

export interface OptionsOverrides {
  overrides?: EslintFlatConfigItem['rules']
}

export interface OptionsTypescriptWithTypes {
  tsconfigPath?: string | string[]
}

export interface OptionsWithFiles {
  files?: Linter.FlatConfig['files']
}

export interface OptionsWithStylistics {
  stylistic?: boolean | StylisticConfig
}

export interface StylisticConfig extends Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'jsx' | 'semi' | 'arrowParens' | 'commaDangle'> {
}

export type ReactOptions = OptionsOverrides & OptionsHasTypescript & OptionsWithFiles & OptionsTypescriptWithTypes

export type VueOptions = OptionsOverrides & OptionsHasTypescript & OptionsWithFiles & OptionsWithStylistics

export type TypescriptOptions = OptionsTypescriptWithTypes & OptionsOverrides & OptionsWithFiles & {
  parserOptions?: Partial<ParserOptions>
}

export type JavascriptOptions = OptionsOverrides & OptionsWithFiles & {
  inEditor?: boolean
}

export type MarkdownOptions = OptionsOverrides & OptionsWithFiles

export type OptionsWithFilesAndOverrides = OptionsWithFiles & OptionsOverrides

export type CommentsOptions = OptionsOverrides

export type JsoncOptions = OptionsOverrides & OptionsWithFiles & OptionsWithStylistics

export type StylisticOptions = OptionsWithStylistics & OptionsOverrides

export type YamlOptions = OptionsOverrides & OptionsWithFiles & OptionsWithStylistics

export interface DprintOptions {
  indentWidth?: number
  quoteStyle?: 'preferSingle' | 'perferDouble'
  useTab?: boolean
}

export interface OptionsFormatters {
  css?: 'prettier' | boolean
  html?: 'prettier' | boolean
  markdown?: 'prettier' | 'dprint' | boolean
  graphql?: 'prettier' | boolean

  prettierOptions?: PerttierOptions
  dprintOptions?: DprintOptions
}

export interface OptionsConfig {
  sort?: boolean | OptionsWithFilesAndOverrides
  javascript?: boolean | JavascriptOptions
  typescript?: boolean | TypescriptOptions
  react?: boolean | OptionsOverrides
  inEditor?: boolean
  enableGitignore?: boolean

  vue?: boolean | VueOptions

  markdown?: boolean | MarkdownOptions

  comments?: CommentsOptions
  jsdoc?: OptionsOverrides

  jsonc?: boolean | JsoncOptions

  stylistic?: boolean | StylisticConfig
  formatters?: boolean | OptionsFormatters
  yaml?: boolean | YamlOptions
  overrides?: {
    typescript?: EslintFlatConfigItem['rules']
    react?: EslintFlatConfigItem['rules']
    javascript?: EslintFlatConfigItem['rules']
    vue?: EslintFlatConfigItem['rules']
    markdown?: EslintFlatConfigItem['rules']
    comments?: EslintFlatConfigItem['rules']
    jsdoc?: EslintFlatConfigItem['rules']
    jsonc?: EslintFlatConfigItem['rules']
    stylistic?: EslintFlatConfigItem['rules']
    sort?: EslintFlatConfigItem['rules']
    yaml?: EslintFlatConfigItem['rules']
  }
}

export type ResolveOptions<T> = T extends boolean ? never : NonNullable<T>
