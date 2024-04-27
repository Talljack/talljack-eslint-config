## talljack-eslint-config

Talljack's ESlint config

## Why write it?

When ESlint upgrades to 9.x, my all projects need to update the ESlint config file, so I want to write my config to be reused in all projects.

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

### Add ESlint scripts for package.json

```typescript
"scripts": {
  "lint": "eslint .",
  "fix": "eslint . --fix"
}
```

### VS Code support

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`

```typescript
{
  "eslint.experimental.useFlatConfig": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never",
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
  ],
}
```


## Customize it

### Basic usage

Use all of the options in the config file.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'
export default createEslintConfig({
  typescript: true,
  jsonc: true,
  markdown: true,
  vue: true,
  yaml: true,
  formatter: true
})
```

### React

To use React eslint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'
export default createEslintConfig({
  react: true
})
```


### Vue3

To use the Vue3 eslint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'
export default createEslintConfig({
  vue: true
})
```

### Markdown

To use the Markdown eslint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'
export default createEslintConfig({
  markdown: true
})
```

### Jsonc

To use the Jsonc eslint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'
export default createEslintConfig({
  jsonc: true
})
```

### Yaml

To use the Yaml eslint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'
export default createEslintConfig({
  yaml: true
})
```

### Astro

To use the Astro eslint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'
export default createEslintConfig({
  astro: true
})
```

### Formatters

To use the Formatters eslint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'
export default createEslintConfig({
  formatters: true
})
```

### Stylistic

To use the Stylistic eslint config, you can turn it on.

**It's default true**

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'
export default createEslintConfig({
  stylistic: true
})
```



### Type-aware rules

you can read more [type-aware](https://typescript-eslint.io/getting-started/typed-linting) here.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'
export default createEslintConfig({
  typescript: {
    tsconfigPath: 'tsconfig.json'
  }
})
```

### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`

you need to install `lint-staged` and `simple-git-hooks`

```typescript
pnpm i -D lint-staged simple-git-hooks

npx simple-git-hooks

```

then

```typescript
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
