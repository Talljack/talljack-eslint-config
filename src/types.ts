import type { ESLint, Linter } from 'eslint'
import type { ParserOptions } from '@typescript-eslint/parser'
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

export type ReactOptions = OptionsOverrides & OptionsHasTypescript &OptionsWithFiles

export type TypescriptOptions = OptionsTypescriptWithTypes & OptionsOverrides & OptionsWithFiles & {
  parserOptions?: Partial<ParserOptions>
}

export type JavascriptOptions = OptionsOverrides & OptionsWithFiles & {
  inEditor?: boolean
}

export interface OptionsConfig {
  javascript?: boolean | JavascriptOptions,
  typescript?: boolean | TypescriptOptions,
  react?: boolean | OptionsOverrides,
  inEditor?: boolean,
  enableGitignore?: boolean,
  overrides?: {
    typescript?: ESLint.ConfigData['rules']
    react?: ESLint.ConfigData['rules']
    javascript?: ESLint.ConfigData['rules']
  }
}

export type ResolveOptions<T> = T extends boolean ? never : NonNullable<T>
