/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

/**
 * css
 */

function css(...classNames) {
  return classNames
    .reduce((accumulator, currentValue) => {
      if (typeof currentValue === 'string') {
        accumulator.push(currentValue.trim())
      } else if (
        !Array.isArray(currentValue) &&
        typeof currentValue === 'object'
      ) {
        for (const e in currentValue) {
          if (currentValue[e]) accumulator.push(e.trim())
        }
      }
      return accumulator
    }, [])
    .filter((e) => e)
    .join(' ')
}

/**
 * getVersion
 */
const getVersion = () => {
  if (typeof document === 'undefined') return {}

  const content = document.querySelector('meta[name="version"]')?.content
  if (!content) return {}

  return Object.fromEntries(content.split(', ').map((item) => item.split('=')))
}

/**
 * View Transition
 */

async function startViewTransition(fun = () => {}, ref, animation) {
  if (!document.startViewTransition || !animation) return fun()

  ref.style.viewTransitionName = animation
  await document.startViewTransition(fun).finished
  ref.style.viewTransitionName = ''
}

export { css, getVersion, startViewTransition }
