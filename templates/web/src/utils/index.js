const env = import.meta.env

const WINDOW_RESIZE = {
  md: 640,
  lg: 1024,
  xl: 1280
}

function sum(a, b) {
  return a + b
}

export { env, sum, WINDOW_RESIZE }
