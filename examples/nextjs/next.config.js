import packageJson from './package.json' with { type: "json" }
import { execSync } from 'node:child_process'

let gitHash = ''
try {
  gitHash = execSync('git rev-parse --short HEAD 2> /dev/null').toString()
} catch (e) { }

export default {

  env: {
    VERSION: packageJson.version,
    GIT_HASH: gitHash
  },

  devIndicators: false

}
