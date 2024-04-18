import { mergeProcessors } from 'eslint-merge-processors'
import pluginVue from 'eslint-plugin-vue'
import processorVueBlocks from 'eslint-processor-vue-blocks'
import parserVue from 'vue-eslint-parser'
import { GLOB_VUE } from '../globs'
import type { Awaitable, EslintFlatConfigItem, VueOptions } from '../types'
import { interopDefault } from '../utils'

const vueConfig: (options: VueOptions) => Awaitable<EslintFlatConfigItem[]> = async (options: VueOptions = {}) => {
  const {
    files = [GLOB_VUE],
    overrides = {},
    stylistic = true,
    typescript,
  } = options

  return [
    // setup config
    {
      languageOptions: {
        globals: {
          computed: 'readonly',
          defineEmits: 'readonly',
          defineExpose: 'readonly',
          defineProps: 'readonly',
          onMounted: 'readonly',
          onUnmounted: 'readonly',
          onUpdated: 'readonly',
          reactive: 'readonly',
          ref: 'readonly',
          shallowReactive: 'readonly',
          shallowRef: 'readonly',
          toRef: 'readonly',
          toRefs: 'readonly',
          watch: 'readonly',
          watchEffect: 'readonly',
        },
      },
      name: 'vue-setup',
      plugins: {
        vue: pluginVue,
      },
    },
    // rules config
    {
      files,
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: ['.vue'],
          parser: typescript ? await interopDefault(import('@typescript-eslint/parser')) : undefined,
          sourceType: 'module',
        },
      },
      name: 'vue-rules',
      processor: mergeProcessors([
        pluginVue.processors['.vue'],
        processorVueBlocks({
          blocks: {
            customBlocks: true,
            script: false,
            styles: true,
            template: false,
          },
        }),
      ]),
      rules: {
        ...pluginVue.configs.base.rules,
        ...pluginVue.configs['vue3-essential'].rules,
        ...pluginVue.configs['vue3-strongly-recommended'].rules,
        ...pluginVue.configs['vue3-recommended'].rules,
        'node/prefer-global/process': 'off',
        'vue/block-order': ['error', {
          order: ['script', 'template', 'style'],
        }],
        // component
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/component-options-name-casing': ['error', 'PascalCase'],
        ...stylistic
          ? {
              'vue/array-bracket-spacing': ['error', 'never'],
              'vue/arrow-spacing': ['error', { after: true, before: true }],
              'vue/block-spacing': ['error', 'always'],
              'vue/block-tag-newline': ['error', {
                multiline: 'always',
                singleline: 'always',
              }],
              'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
              'vue/comma-dangle': ['error', 'always-multiline'],
              'vue/comma-spacing': ['error', { after: true, before: false }],
              'vue/comma-style': ['error', 'last'],
              'vue/html-comment-content-spacing': ['error', 'always', {
                exceptions: ['-'],
              }],
              'vue/key-spacing': ['error', { afterColon: true, beforeColon: false }],
              'vue/keyword-spacing': ['error', { after: true, before: true }],
              'vue/object-curly-newline': 'off',
              'vue/object-curly-spacing': ['error', 'always'],
              'vue/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
              'vue/operator-linebreak': ['error', 'before'],
              'vue/padding-line-between-blocks': ['error', 'always'],
              'vue/quote-props': ['error', 'consistent-as-needed'],
              'vue/space-in-parens': ['error', 'never'],
              'vue/template-curly-spacing': 'error',
            }
          : {},
        ...overrides,
      },
    },
  ] as EslintFlatConfigItem[]
}

export default vueConfig
