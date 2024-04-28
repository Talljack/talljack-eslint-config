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

export const ensurePackagesInstalled = async (packages: string[]) => {
  if (process.env.CI || process.stdout.isTTY === false)
    return

  const nonExistsPackages = packages.filter(pkg => pkg && !isPackageExists(pkg))
  if (nonExistsPackages.length === 0)
    return

  const { confirm } = await import('@clack/prompts')
  const res = await confirm({
    message: `The following packages are required: ${nonExistsPackages.join(', ')}`,
  })
  if (res)
    await import('@antfu/install-pkg').then(i => i.installPackage(nonExistsPackages, { dev: true }))
}
