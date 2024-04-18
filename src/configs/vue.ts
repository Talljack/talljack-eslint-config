import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'
import processorVueBlocks from 'eslint-processor-vue-blocks'
import { mergeProcessors } from 'eslint-merge-processors'
import { GLOB_VUE } from '../globs'
import type { Awaitable, EslintFlatConfigItem, VueOptions } from '../types'
import { interopDefault } from '../utils'

const vueConfig: (options: VueOptions) => Awaitable<EslintFlatConfigItem[]> = async (options: VueOptions = {}) => {
  const {
    files = [GLOB_VUE],
    stylistic = true,
    overrides = {},
    typescript,
  } = options

  return [
    // setup config
    {
      name: 'vue-setup',
      plugins: {
        vue: pluginVue,
      },
      languageOptions: {
        globals: {
          computed: 'readonly',
          defineEmits: 'readonly',
          defineProps: 'readonly',
          defineExpose: 'readonly',
          onMounted: 'readonly',
          onUnmounted: 'readonly',
          onUpdated: 'readonly',
          ref: 'readonly',
          reactive: 'readonly',
          shallowRef: 'readonly',
          shallowReactive: 'readonly',
          toRef: 'readonly',
          toRefs: 'readonly',
          watch: 'readonly',
          watchEffect: 'readonly',
        },
      },
    },
    // rules config
    {
      name: 'vue-rules',
      files,
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          sourceType: 'module',
          extraFileExtensions: ['.vue'],
          parser: typescript ? await interopDefault(import('@typescript-eslint/parser')) : undefined,
        },
      },
      processor: mergeProcessors([
        pluginVue.processors['.vue'],
        processorVueBlocks({
          blocks: {
            styles: true,
            customBlocks: true,
            script: false,
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
