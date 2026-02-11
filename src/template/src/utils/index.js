import { useQueryString } from './hooks'

const env = import.meta.env

async function startViewTransition(fun = () => {}, ref, animation) {
  if (!document.startViewTransition || env.VITE_VIEW_TRANSITION === 'false')
    return fun()

  ref.style.viewTransitionName = animation
  await document.startViewTransition(fun).finished
  ref.style.viewTransitionName = ''
}

export { env, useQueryString, startViewTransition }
