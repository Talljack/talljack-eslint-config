import { default as pluginJsonc } from 'eslint-plugin-jsonc'
import type { EslintFlatConfigItem, JsoncOptions } from '../types'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs'

const jsoncConfig: (options: JsoncOptions) => EslintFlatConfigItem[] = (options: JsoncOptions = {}) => {
  const {
    overrides = {},
    files = [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
    stylistic = true
  } = options
  const {
    indent = 2
  } = typeof stylistic === 'boolean' ? {} : stylistic
  return [
    ...pluginJsonc.configs['flat/recommended-with-jsonc'],
    {
      name: 'jsonc-setup',
      plugins: {
        jsonc: pluginJsonc
      }
    },
    {
      files,
      name: 'jsonc-rules',
      rules: {
        // stylistic link: https://eslint.style/packages/default
        ...stylistic
          ? {
              'jsonc/array-bracket-spacing': ['error', 'never'],
              'jsonc/comma-dangle': ['error', 'never'],
              'jsonc/comma-style': ['error', 'last'],
              'jsonc/indent': ['error', indent],
              'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
              'jsonc/object-curly-newline': ['error', { consistent: true, multiline: true }],
              'jsonc/object-curly-spacing': ['error', 'always'],
              'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
              'jsonc/quote-props': 'error',
              'jsonc/quotes': 'error',
            }
          : {},
        ...overrides
      },
    }
  ] as EslintFlatConfigItem[]
}

export const sortPackageJsonConfig:() => EslintFlatConfigItem[] = () => {
  return [
    {
      name: 'sort-package-json',
      files: ['**/package.json'],
      rules: {
        'jsonc/sort-array-values': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '^files$',
          },
        ],
        'jsonc/sort-keys': [
          'error',
          {
            order: [
              'publisher',
              'name',
              'displayName',
              'type',
              'version',
              'private',
              'packageManager',
              'description',
              'author',
              'license',
              'funding',
              'homepage',
              'repository',
              'bugs',
              'keywords',
              'categories',
              'sideEffects',
              'exports',
              'main',
              'module',
              'unpkg',
              'jsdelivr',
              'types',
              'typesVersions',
              'bin',
              'icon',
              'files',
              'engines',
              'activationEvents',
              'contributes',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'optionalDependencies',
              'devDependencies',
              'pnpm',
              'overrides',
              'resolutions',
              'husky',
              'simple-git-hooks',
              'lint-staged',
              'eslintConfig',
            ],
            pathPattern: '^$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$',
          },
          {
            order: [
              'types',
              'import',
              'require',
              'default',
            ],
            pathPattern: '^exports.*$',
          },
          {
            order: [
              // client hooks only
              'pre-commit',
              'prepare-commit-msg',
              'commit-msg',
              'post-commit',
              'pre-rebase',
              'post-rewrite',
              'post-checkout',
              'post-merge',
              'pre-push',
              'pre-auto-gc',
            ],
            pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$',
          },
        ],
      },
    },
  ]
}

export const sortTsConfigJsonConfig: () => EslintFlatConfigItem[] = () => {
  return [
    {
      name: 'sort-tsconfig-json',
      files: ['**/tsconfig.json'],
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            order: [
              'extends',
              'compilerOptions',
              'references',
              'files',
              'include',
              'exclude'
            ],
            pathPattern: '^$'
          },
          {
            order: [
              /* Projects */
              'incremental',
              'composite',
              'tsBuildInfoFile',
              'disableSourceOfProjectReferenceRedirect',
              'disableSolutionSearching',
              'disableReferencedProjectLoad',
              /* Language and Environment */
              'target',
              'jsx',
              'jsxFactory',
              'jsxFragmentFactory',
              'jsxImportSource',
              'lib',
              'moduleDetection',
              'noLib',
              'reactNamespace',
              'useDefineForClassFields',
              'emitDecoratorMetadata',
              'experimentalDecorators',
              /* Modules */
              'baseUrl',
              'rootDir',
              'rootDirs',
              'customConditions',
              'module',
              'moduleResolution',
              'moduleSuffixes',
              'noResolve',
              'paths',
              'resolveJsonModule',
              'resolvePackageJsonExports',
              'resolvePackageJsonImports',
              'typeRoots',
              'types',
              'allowArbitraryExtensions',
              'allowImportingTsExtensions',
              'allowUmdGlobalAccess',
              /* JavaScript Support */
              'allowJs',
              'checkJs',
              'maxNodeModuleJsDepth',
              /* Type Checking */
              'strict',
              'strictBindCallApply',
              'strictFunctionTypes',
              'strictNullChecks',
              'strictPropertyInitialization',
              'allowUnreachableCode',
              'allowUnusedLabels',
              'alwaysStrict',
              'exactOptionalPropertyTypes',
              'noFallthroughCasesInSwitch',
              'noImplicitAny',
              'noImplicitOverride',
              'noImplicitReturns',
              'noImplicitThis',
              'noPropertyAccessFromIndexSignature',
              'noUncheckedIndexedAccess',
              'noUnusedLocals',
              'noUnusedParameters',
              'useUnknownInCatchVariables',
              /* Emit */
              'declaration',
              'declarationDir',
              'declarationMap',
              'downlevelIteration',
              'emitBOM',
              'emitDeclarationOnly',
              'importHelpers',
              'importsNotUsedAsValues',
              'inlineSourceMap',
              'inlineSources',
              'mapRoot',
              'newLine',
              'noEmit',
              'noEmitHelpers',
              'noEmitOnError',
              'outDir',
              'outFile',
              'preserveConstEnums',
              'preserveValueImports',
              'removeComments',
              'sourceMap',
              'sourceRoot',
              'stripInternal',
              /* Interop Constraints */
              'allowSyntheticDefaultImports',
              'esModuleInterop',
              'forceConsistentCasingInFileNames',
              'isolatedModules',
              'preserveSymlinks',
              'verbatimModuleSyntax',
              /* Completeness */
              'skipDefaultLibCheck',
              'skipLibCheck',
            ],
            pathPattern: '^compilerOptions$'
          }
        ]
      }
    }
  ]
}

export default jsoncConfig
