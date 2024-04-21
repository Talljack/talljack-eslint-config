import { GLOB_EXCLUDE } from '../globs'
import type { EslintFlatConfigItem } from '../types'

const ignoresConfig: (customIgnores?: string[]) => EslintFlatConfigItem[] = (customIgnores?: string[]) => {
  return [
    {
      ignores: GLOB_EXCLUDE.concat(customIgnores || []),
    },
  ]
}

export default ignoresConfig
