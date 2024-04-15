import type { ESLint, Linter } from 'eslint'
import type { ParserOptions } from '@typescript-eslint/parser'

export type EslintFlatConfigItem = Omit<Linter.FlatConfig<Linter.RulesRecord>, 'plugins'> & {
  plugins?: Record<string, any>
}

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

export type ReactOptions = OptionsOverrides & OptionsHasTypescript &OptionsWithFiles

export type TypescriptOptions = OptionsTypescriptWithTypes & OptionsOverrides & OptionsWithFiles & {
  parserOptions?: Partial<ParserOptions>
}

export interface OptionsConfig {
  typescript?: boolean | TypescriptOptions,
  react?: boolean | OptionsOverrides,
  overrides?: {
    typescript?: ESLint.ConfigData['rules']
    react?: ESLint.ConfigData['rules']
  }
}

export type ResolveOptions<T> = T extends boolean ? never : NonNullable<T>
