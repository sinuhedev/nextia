/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import { createElement, useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

/**
 * env
 */
const env = import.meta.env

/**
 * ui
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

function Link({ children, href, value = {}, ...props }) {
  href ??= window.location.hash.split('?')[0]
  value = Object.keys(value).length
    ? `?${new URLSearchParams(value).toString()}`
    : ''

  return createElement('a', { href: href + value, ...props }, children)
}

/**
 * hooks
 */

function useQueryString() {
  const getQueryString = useCallback(
    () => ({
      hash: window.location.hash.split('?')[0],
      queryString: Object.fromEntries(
        new URLSearchParams(window.location.hash.split('?')[1])
      )
    }),
    []
  )

  const [queryString, setQueryString] = useState(getQueryString)

  useEffect(() => {
    const handlePopState = () => setQueryString(getQueryString())

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [getQueryString])

  return queryString
}

function useResize() {
  const getResize = useCallback(
    () => ({
      width: window.innerWidth,
      height: window.innerHeight
    }),
    []
  )

  const [resize, setResize] = useState(getResize)

  useEffect(() => {
    const handleResize = () => setResize(getResize())

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [getResize])

  return resize
}

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

export { css, env, Link, startViewTransition, useQueryString, useResize }
