import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { ParserOptions } from '@typescript-eslint/parser'
import type { Linter } from 'eslint'
import type { ConfigNames, RuleOptions } from './genType'

export type Awaitable<T> = T | Promise<T>

export type { ConfigNames }

export interface PrettierOptionsRequired {
  /**
   * Specify the line length that the printer will wrap on.
   * @default 120
   */
  printWidth: number
  /**
   * Specify the number of spaces per indentation-level.
   */
  tabWidth: number
  /**
   * Indent lines with tabs instead of spaces
   */
  useTabs?: boolean
  /**
   * Print semicolons at the ends of statements.
   */
  semi: boolean
  /**
   * Use single quotes instead of double quotes.
   */
  singleQuote: boolean
  /**
   * Use single quotes in JSX.
   */
  jsxSingleQuote: boolean
  /**
   * Print trailing commas wherever possible.
   */
  trailingComma: 'none' | 'es5' | 'all'
  /**
   * Print spaces between brackets in object literals.
   */
  bracketSpacing: boolean
  /**
   * Put the `>` of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being
   * alone on the next line (does not apply to self closing elements).
   */
  bracketSameLine: boolean
  /**
   * Put the `>` of a multi-line JSX element at the end of the last line instead of being alone on the next line.
   * @deprecated use bracketSameLine instead
   */
  jsxBracketSameLine: boolean
  /**
   * Format only a segment of a file.
   */
  rangeStart: number
  /**
   * Format only a segment of a file.
   * @default Number.POSITIVE_INFINITY
   */
  rangeEnd: number
  /**
   * By default, Prettier will wrap markdown text as-is since some services use a linebreak-sensitive renderer.
   * In some cases you may want to rely on editor/viewer soft wrapping instead, so this option allows you to opt out.
   * @default "preserve"
   */
  proseWrap: 'always' | 'never' | 'preserve'
  /**
   * Include parentheses around a sole arrow function parameter.
   * @default "always"
   */
  arrowParens: 'avoid' | 'always'
  /**
   * Provide ability to support new languages to prettier.
   */
  plugins: Array<string | any>
  /**
   * How to handle whitespaces in HTML.
   * @default "css"
   */
  htmlWhitespaceSensitivity: 'css' | 'strict' | 'ignore'
  /**
   * Which end of line characters to apply.
   * @default "lf"
   */
  endOfLine: 'auto' | 'lf' | 'crlf' | 'cr'
  /**
   * Change when properties in objects are quoted.
   * @default "as-needed"
   */
  quoteProps: 'as-needed' | 'consistent' | 'preserve'
  /**
   * Whether or not to indent the code inside <script> and <style> tags in Vue files.
   * @default false
   */
  vueIndentScriptAndStyle: boolean
  /**
   * Enforce single attribute per line in HTML, Vue and JSX.
   * @default false
   */
  singleAttributePerLine: boolean
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
