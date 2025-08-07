import { useResize } from './hooks'

async function startViewTransition (fun = () => {}, ref, animation) {
  if (!document.startViewTransition) return fun()

  ref.style.viewTransitionName = animation
  await document.startViewTransition(fun).finished
  ref.style.viewTransitionName = ''
}

function sum (a, b) {
  return a + b
}

export {
  // hooks
  useResize,
  // util
  startViewTransition,
  sum
}
