import type { OptionsConfig, ResolveOptions } from "./types"

export const toArray = <T>(value: T|T[]) => {
  return Array.isArray(value) ? value : [value]
}


export const resolveSubOptions = <K extends keyof OptionsConfig>(options: OptionsConfig, key: K): ResolveOptions<OptionsConfig[K]> => {
  return typeof options[key] === 'boolean' ? {} as any : options[key] || {}
}


export const getOverrides = <K extends keyof OptionsConfig>(options: OptionsConfig, key: K) => {
  const subValue = resolveSubOptions(options, key)
  return {
    ...options.overrides?.[key] ?? {},
    ...'overrides' in subValue ? subValue.overrides : {}
  }
}
