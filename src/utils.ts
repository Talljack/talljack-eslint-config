import { isPackageExists } from 'local-pkg'
import type { Awaitable, EslintFlatConfigItem, OptionsConfig, ResolveOptions } from './types'

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

export const combineConfigs = async (...configs: Awaitable<EslintFlatConfigItem[]>[]): Promise<EslintFlatConfigItem[]> => {
  return (await Promise.all(configs)).flat()
}

export const ensurePackages = async (packages: string[]) => {
  const nonExistingPackages = packages.filter(pkg => pkg && !isPackageExists(pkg))
  // all package exist
  if (nonExistingPackages.length === 0)
    return
  const prompts = await import('@clack/prompts')
  const result = await prompts.confirm({
    message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}.\nDo you want to install them?`,
  })
  if (result)
    await import('@antfu/install-pkg').then(install => install.installPackage(nonExistingPackages, { dev: true }))
}
