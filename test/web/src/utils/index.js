import { useQueryString, useResize } from './hooks'

const env = import.meta.env

async function startViewTransition(fun = () => {}, ref, animation) {
  if (!document.startViewTransition || env.VITE_VIEW_TRANSITION === 'false')
    return fun()

  ref.style.viewTransitionName = animation
  await document.startViewTransition(fun).finished
  ref.style.viewTransitionName = ''
}

function sum(a, b) {
  return a + b
}

export {
  env,
  // hooks
  useResize,
  useQueryString,
  // util
  startViewTransition,
  sum
}
