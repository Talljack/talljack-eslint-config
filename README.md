# talljack-eslint-config

Talljack's eslint config

## Why write it?

When eslint upgrades to 9.x, my all projects need to update eslint config file, so I want to write my config to be reused in all projects.

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

### Add eslint scripts for package.json

```json
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

To use Vue3 eslint config, you can turn it on.

```typescript
// eslint.config.js
import createEslintConfig from 'talljack-eslint-config'
export default createEslintConfig({
  vue: true
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

If you want to apply lint and autofix before every commit, you can add the following to your `package.json`

you need to install `lint-staged` and `simple-git-hooks`

```typescript
pnpm i -D lint-staged simple-git-hooks

npx simple-git-hooks

```

then

```ts
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

# License

[MIT](./LICENSE) License @2024-PRESENT [Talljack](https://github.com/talljack)
