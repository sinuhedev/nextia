/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import { useEffect, useMemo, useState } from 'react'

/**
 * utils
 */

async function startViewTransition(fun = () => {}, ref, animation) {
  if (!document.startViewTransition || !animation || !ref) return fun()

  ref.style.viewTransitionName = animation
  try {
    await document.startViewTransition(fun).finished
  } finally {
    ref.style.viewTransitionName = ''
  }
}

const isObject = (obj) =>
  obj !== null && typeof obj === 'object' && !Array.isArray(obj)

const isFlatten = (str) => Object.keys(str)[0].includes('.')

function unflatten(str) {
  const output = {}

  for (const [path, value] of Object.entries(str)) {
    const keys = path.split('.')

    let current = output
    for (const index in keys) {
      const key = keys[index]

      if (Number(index) === keys.length - 1) {
        current[key] = value
      } else {
        current[key] ??= {}
        current = current[key]
      }
    }
  }

  return output
}

function merge(target, source) {
  // in array return all source
  if (Array.isArray(target)) return source

  // nothing to merge
  if (!source || Object.keys(source).length === 0) return target

  const output = { ...target }

  for (const key of Object.keys(source)) {
    const tVal = target[key]
    const sVal = source[key]

    if (isObject(tVal) && isObject(sVal) && Object.keys(sVal).length) {
      output[key] = merge(tVal, sVal)
    } else {
      output[key] = sVal
    }
  }

  return output
}

/**
 * actions
 */

const put = (prev, payload) =>
  merge(prev, isFlatten(payload) ? unflatten(payload) : payload)

const show = (prev, payload) => merge(prev, unflatten({ [payload]: true }))

const hide = (prev, payload) => merge(prev, unflatten({ [payload]: false }))

const change = (prev, payload) =>
  merge(
    prev,
    unflatten({
      [payload.target.name]:
        payload.target.type === 'checkbox'
          ? payload.target.checked
          : payload.target.value
    })
  )

const reset = (prev, payload, initialState) => {
  if (!payload) return initialState

  const list = Array.isArray(payload) ? payload : [payload]

  return list.reduce((output, path) => {
    const value = path.split('.').reduce((acc, key) => acc?.[key], initialState)
    return merge(output, unflatten({ [path]: value }))
  }, prev)
}

/**
 * hooks
 */

function useQueryString() {
  const getQueryString = () => {
    const [hash, search = ''] = window.location.hash.split('?')
    return {
      hash,
      queryString: Object.fromEntries(new URLSearchParams(search))
    }
  }

  const [queryString, setQueryString] = useState(getQueryString)

  useEffect(() => {
    const handlePopState = () => setQueryString(getQueryString())

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return queryString
}

function usePage({
  hashPage = '',
  homePage = '#/home',
  currentPage = () => {},
  viewTransition = null,
  viewTransitionName = ''
}) {
  const [Page, setPage] = useState()

  useEffect(() => {
    const normalizeHash = ['', '#/'].includes(hashPage) ? homePage : hashPage
    const path = normalizeHash.substring(2).split('/').filter(Boolean)
    const importPage = currentPage(path)

    importPage()
      .then((page) => {
        startViewTransition(
          () => setPage(() => page.default),
          viewTransition.current,
          viewTransitionName
        )
      })
      .catch((e) => {
        console.error(e)
      })
  }, [hashPage, homePage, viewTransition, viewTransitionName])

  return Page
}

/**
 * useFx
 */

function useFx(initialState = {}, functions = {}) {
  // State
  const [state, setState] = useState(initialState)

  // Actions
  const actions = useMemo(
    () => ({
      put: (payload) => setState((prev) => put(prev, payload)),
      show: (payload) => setState((prev) => show(prev, payload)),
      hide: (payload) => setState((prev) => hide(prev, payload)),
      change: (payload) => setState((prev) => change(prev, payload)),
      reset: (payload) => setState((prev) => reset(prev, payload, initialState))
    }),
    [initialState]
  )

  // Action functions
  const actionsFx = useMemo(() => {
    const fxs = {}

    for (const [key, fn] of Object.entries(functions)) {
      if (typeof fn === 'function')
        fxs[key] = (payload) =>
          fn(
            Object.freeze({
              ...actions,
              state,
              payload
            })
          )
    }
    return fxs
  }, [functions, actions, state])

  // return
  return useMemo(
    () =>
      Object.freeze({
        initialState,
        state,
        fx: { ...actions, ...actionsFx }
      }),
    [initialState, state, actions, actionsFx]
  )
}

export { startViewTransition, useFx, usePage, useQueryString }
