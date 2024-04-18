import type { Awaitable, OptionsConfig, ResolveOptions } from './types'

export const toArray = <T>(value: T | T[]) => {
  return Array.isArray(value) ? value : [value]
}

export const resolveSubOptions = <K extends keyof OptionsConfig>(options: OptionsConfig, key: K): ResolveOptions<OptionsConfig[K]> => {
  return typeof options[key] === 'boolean' ? {} as any : options[key] || {}
}

export const getOverrides = <K extends keyof OptionsConfig>(options: OptionsConfig, key: K) => {
  const subValue = resolveSubOptions(options, key)
  return {
    ...options.overrides?.[key as keyof typeof options.overrides] ?? {},
    ...'overrides' in subValue ? subValue.overrides : {},
  }
}

export const interopDefault = async <T>(value: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> => {
  const resolveVal = await value
  return (resolveVal as any).default || resolveVal
}
