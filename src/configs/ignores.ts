import { GLOB_EXCLUDE } from '../globs'
import type { EslintFlatConfigItem } from '../types'

const ignoresConfig: () => EslintFlatConfigItem[] = () => {
  return [
    {
      ignores: GLOB_EXCLUDE
    }
  ]
}

export default ignoresConfig
