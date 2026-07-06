/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import { createContext, use, useReducer } from 'react'

const Pagex = createContext()

const ACTIONS = {
  PUT: 'put',
  SHOW: 'show',
  HIDE: 'hide',
  CHANGE: 'change',
  RESET: 'reset'
}

/**
 * util
 */

const isObject = (obj) =>
  obj !== null && typeof obj === 'object' && !Array.isArray(obj)

function values(state, payload, value) {
  const dot = payload.indexOf('.')

  // one level
  if (dot === -1) {
    // put Object and empty or exist object
    if (isObject(state[payload]) && isObject(value))
      return {
        ...state,
        [payload]: Object.keys(value).length
          ? { ...state[payload], ...value }
          : {}
      }

    // put Value
    return {
      ...state,
      [payload]: value
    }
  }

  // multi levels
  const key = payload.slice(0, dot)
  const rest = payload.slice(dot + 1)

  return { ...state, [key]: values(state[key] ?? {}, rest, value) }
}

function merge(target, source) {
  // in array return all source
  if (Array.isArray(target)) return source

  const output = { ...target }

  // merge
  for (const key of Object.keys(source)) {
    const tVal = target[key]
    const sVal = source[key]

    output[key] =
      isObject(tVal) && isObject(sVal)
        ? Object.keys(sVal).length
          ? merge(tVal, sVal)
          : {}
        : sVal
  }

  return output
}

/**
 * reducer
 */

function reducer(state, action) {
  const { type, payload, initialState } = action

  switch (type) {
    case ACTIONS.PUT:
      // Merge custom items
      if (Object.keys(payload).length === 1) {
        const key = Object.keys(payload)[0]
        return values(state, key, payload[key])
      }

      // Merge all json
      return merge(state, payload)

    case ACTIONS.SHOW:
      return values(state, payload, true)

    case ACTIONS.HIDE:
      return values(state, payload, false)

    case ACTIONS.CHANGE:
      return values(
        state,
        payload.target.name,
        payload.target.type === 'checkbox'
          ? payload.target.checked
          : payload.target.value
      )

    case ACTIONS.RESET:
      // reset custom items
      if (payload) {
        const paths = Array.isArray(payload) ? payload : [payload]

        return paths.reduce((ac, path) => {
          const value = path.split('.').reduce((ac, e) => ac[e], initialState)
          return values(ac, path, value)
        }, state)
      }

      // all reset
      return initialState

    default:
      return state
  }
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

function useFx(functions = { initialState: {} }) {
  const { initialState } = functions

  // Context
  const cx = useCx()

  // Reducer
  const [state, dispatch] = useReducer(reducer, initialState)

  // Actions
  const actions = {}
  for (const type of Object.values(ACTIONS)) {
    actions[type] = (payload) =>
      dispatch({
        type,
        payload,
        initialState
      })
  }

  // Action functions
  const actionsFx = {}
  for (const [key, fn] of Object.entries(functions)) {
    if (typeof fn === 'function')
      actionsFx[key] = (payload) =>
        fn(
          Object.freeze({
            ...actions,
            state,
            payload,
            context: cx.context
          })
        )
  }

  return Object.freeze({
    initialState,
    state,
    fx: { ...actions, ...actionsFx },
    context: cx.context
  })
}

export { Pagex, useCx, useFx }
