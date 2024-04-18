import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { ParserOptions } from '@typescript-eslint/parser'
import type { ESLint, Linter } from 'eslint'
import type { FlatConfigItem } from 'eslint-config-flat-gitignore'

export type Awaitable<T> = T | Promise<T>

export type EslintFlatConfigItem = Omit<Linter.FlatConfig<Linter.RulesRecord>, 'plugins'> & {
  plugins?: Record<string, any>
} & Partial<FlatConfigItem>

export interface OptionsHasTypescript {
  typescript?: boolean
}

export interface OptionsOverrides {
  overrides?: ESLint.ConfigData['rules']
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

export type ReactOptions = OptionsOverrides & OptionsHasTypescript & OptionsWithFiles

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
  overrides?: {
    typescript?: ESLint.ConfigData['rules']
    react?: ESLint.ConfigData['rules']
    javascript?: ESLint.ConfigData['rules']
    vue?: ESLint.ConfigData['rules']
    markdown?: ESLint.ConfigData['rules']
    comments?: ESLint.ConfigData['rules']
    jsdoc?: ESLint.ConfigData['rules']
    jsonc?: ESLint.ConfigData['rules']
    stylistic?: ESLint.ConfigData['rules']
    sort?: ESLint.ConfigData['rules']
  }
}

export type ResolveOptions<T> = T extends boolean ? never : NonNullable<T>
