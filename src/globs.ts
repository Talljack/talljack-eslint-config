export const GLOB_JS = '**/*.?([cm])js'
export const GLOB_JSX = '**/*.?([cm])jsx'

export const GLOB_TS = '**/*.?([cm])ts'
export const GLOB_TSX = '**/*.?([cm])tsx'

export const GLOB_SRC_EXT = '?([cm])[jt]s?(x)'
export const GLOB_SRC = '**/*.?([cm])[jt]s?(x)'

export const GLOB_VUE = '**/*.vue'

export const GLOB_MARKDOWN = '**/*.md'
export const GLOB_MARKDOWN_IN_MARKDOWN = '**/*.md/*.md'

// jsonc
export const GLOB_JSON = '**/*.json'
export const GLOB_JSON5 = '**/*.json5'
export const GLOB_JSONC = '**/*.jsonc'

// css
export const GLOB_CSS = '**/*.css'
export const GLOB_POSTCSS = '**/*.(p,post)css'
// less
export const GLOB_LESS = '**/*.less'
// scss
export const GLOB_SCSS = '**/*.scss'
export const GLOB_STYLE = '**/*.{c,le,sc}ss'

// html
export const GLOB_HTML = '**/*.htm?(l)'

// graphql
export const GLOB_GRAPHQL = '**/*.{g,graph}ql'

// yaml
export const GLOB_YAML = '**/*.y?(a)ml'

// astro
export const GLOB_ASTRO = '**/*.astro'

// tests
export const GLOB_TESTS = [
  '**/__tests__/**/*.[jt]s?(x)',
  '**/?(*.)+(spec|test).[jt]s?(x)',
  '**/?(*.)+(spec|test).+(ts|js)x',
]

export const GLOB_EXCLUDE = [
  '**/node_modules',
  '**/dist',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',

  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.next',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.cache',
  '**/.output',
  '**/.vite-inspect',
  '**/.yarn',

  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts',
]
