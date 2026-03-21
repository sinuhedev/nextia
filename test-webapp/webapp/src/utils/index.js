import { flushSync } from 'react-dom'
import { useQueryString, useResize } from './hooks'

const env = import.meta.env

async function startViewTransition(fun = () => {}, ref, animation = 'fade') {
  if (!document.startViewTransition || env.PUBLIC_VIEW_TRANSITION === 'false')
    return fun()

  ref.style.viewTransitionName = animation
  await document.startViewTransition(() => flushSync(fun)).finished
  ref.style.viewTransitionName = ''
}

function sum(a, b) {
  return a + b
}

export { env, startViewTransition, sum, useQueryString, useResize }
