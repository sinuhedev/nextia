/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import {
  createContext,
  lazy,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { startViewTransition } from './utils'

const Pagex = createContext()

/**
 * util
 */

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
 * hooks: useQueryString and usePage
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
  hash,
  homePage = '#/home',
  importPage = () => {},
  viewTransition = {
    ref: null,
    name: ''
  }
}) {
  const [Page, setPage] = useState()
  const { ref, name = '' } = viewTransition

  useEffect(() => {
    const page = lazy(() => {
      const normalizeHash = ['', '#/'].includes(hash) ? homePage : hash
      const path = normalizeHash.substring(2).split('/').filter(Boolean)

      // importPage return to Promise
      return importPage(path).catch((e) => {
        console.error(e)
        return importPage() // fallback
      })
    })

    startViewTransition(() => setPage(page), ref.current, name)
  }, [hash, homePage, ref, name])

  return Page
}

/**
 * useCx and useFx
 */

function useCx() {
  const pages = use(Pagex)

  return {
    context: pages?.context,
    i18n: pages?.i18n,
    icons: pages?.icons
  }
}

function useFx(initialState = {}, functions = {}) {
  // Context
  const cx = useCx()

  // QueryString
  const qs = useQueryString()

  // State
  const [state, setState] = useState(initialState)

  // Actions
  const put = useCallback((payload) => {
    setState((prev) =>
      merge(prev, isFlatten(payload) ? unflatten(payload) : payload)
    )
  }, [])

  const show = useCallback((payload) => {
    setState((prev) => merge(prev, unflatten({ [payload]: true })))
  }, [])

  const hide = useCallback((payload) => {
    setState((prev) => merge(prev, unflatten({ [payload]: false })))
  }, [])

  const reset = useCallback(
    (payload) => {
      if (payload) {
        const paths = Array.isArray(payload) ? payload : [payload]

        setState((prev) => {
          let output = prev
          for (const path of paths) {
            let value = initialState

            for (const key of path.split('.')) {
              value = value[key]
            }

            output = merge(output, unflatten({ [path]: value }))
          }
          return output
        })
      } else {
        setState(initialState)
      }
    },
    [initialState]
  )

  const change = useCallback((payload) => {
    setState((prev) =>
      merge(
        prev,
        unflatten({
          [payload.target.name]:
            payload.target.type === 'checkbox'
              ? payload.target.checked
              : payload.target.value
        })
      )
    )
  }, [])

  const actions = useMemo(
    () => ({
      put,
      show,
      hide,
      reset,
      change
    }),
    [put, show, hide, reset, change]
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
              payload,
              qs,
              context: cx.context
            })
          )
    }
    return fxs
  }, [functions, actions, state, qs, cx.context])

  // return
  return useMemo(
    () =>
      Object.freeze({
        initialState,
        state,
        fx: { ...actions, ...actionsFx },
        qs,
        context: cx.context
      }),
    [initialState, state, actions, actionsFx, qs, cx.context]
  )
}

export { Pagex, useCx, useFx, usePage }
