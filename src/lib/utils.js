/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import { flushSync } from 'react-dom'

/**
 * env
 */

const env = import.meta.env

/**
 * View Transition
 */

async function startViewTransition(fun = () => {}, ref, animation = 'fade') {
  if (!document.startViewTransition || env.PUBLIC_VIEW_TRANSITION === 'false')
    return fun()

  ref.style.viewTransitionName = animation
  await document.startViewTransition(() => flushSync(fun)).finished
  ref.style.viewTransitionName = ''
}

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

export { css, env, startViewTransition }
