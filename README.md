## talljack-eslint-config

Talljack's ESLint config

## Why write it?

When ESLint upgrades to flat config(ESLint 9), my all projects need to update the ESLint config file, so I want to write my config to be reused in all projects.

## How to use it?

```bash
pnpm i -D eslint talljack-eslint-config
```

And create `eslint.config.js`(you need to set package.json's `type` to `module`) like this:

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'

export default createEslintConfig()
```

### Add ESLint scripts for package.json

```json
{
  "scripts": {
    "lint": "eslint .",
    "fix": "eslint . --fix"
  }
}
```

### VS Code support

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`

```json
{
  "eslint.experimental.useFlatConfig": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  "editor.formatOnSave": false,
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "json5",
    "astro"
  ]
}
```


## Customize it

### Basic usage

Use all of the options in the config file.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'

export default createEslintConfig({
  formatter: true,
  jsonc: true,
  markdown: true,
  typescript: true,
  vue: true,
  yaml: true,
})
```

### React
To use the React ESLint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'

export default createEslintConfig({
  react: true,
})
```


### Vue3

To use the Vue3 ESLint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'

export default createEslintConfig({
  vue: true,
})
```

### Markdown

To use the Markdown ESLint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'

export default createEslintConfig({
  markdown: true,
})
```

### Jsonc

To use the Jsonc ESLint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'

export default createEslintConfig({
  jsonc: true,
})
```

### Yaml

To use the Yaml ESLint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'

export default createEslintConfig({
  yaml: true,
})
```

### Astro

To use the Astro ESLint config, you can turn it on(**you need to install `eslint-plugin-astro`**).

```bash
pnpm add -D eslint-plugin-astro
```

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'

export default createEslintConfig({
  astro: true,
})
```

### Solid

To use the Solid ESLint config, you can turn it on(**you need to install `eslint-plugin-solid`**).

```bash
pnpm add -D eslint-plugin-solid
```


```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'

export default createEslintConfig({
  solid: true,
})
```

### Test

To use the Test ESLint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'

export default createEslintConfig({
  test: true,
})
```

### Formatters

To use the Formatters ESLint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'

export default createEslintConfig({
  formatters: true,
})
```

### Stylistic

To use the Stylistic ESLint config, you can turn it on.

**It's default true**

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'

export default createEslintConfig({
  stylistic: true,
})
```



### Type-aware rules

you can read more [type-aware](https://typescript-eslint.io/getting-started/typed-linting) here.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'

export default createEslintConfig({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
})
```

### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`

you need to install `lint-staged` and `simple-git-hooks`

```bash
pnpm i -D lint-staged simple-git-hooks

npx simple-git-hooks

```

then

```json
// package.json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

## License

[MIT](./LICENSE) License @2024-PRESENT [Talljack](https://github.com/talljack)
