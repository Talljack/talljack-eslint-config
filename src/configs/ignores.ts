import { GLOB_EXCLUDE } from '../globs'
import type { EslintFlatConfigItem } from '../types'
const ignores: () => EslintFlatConfigItem[] = () => {
  return [
    {
      ignores: GLOB_EXCLUDE
    }
  ]
}

export default ignores
