import { version } from 'nextia'

const env = import.meta.env

env.WINDOW_RESIZE = {
  md: 640,
  lg: 1024,
  xl: 1280
}

env.VERSION = version()

function sum(a, b) {
  return a + b
}

export { env, sum }
