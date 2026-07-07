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
  // isFlatten
  if (Object.keys(source)[0].includes('.')) {
    source = unflatten(source)
  }

  // in array return all source
  if (Array.isArray(target)) return source

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
 * reducer
 */

function reducer(state, action) {
  const { type, payload, initialState } = action

  switch (type) {
    case ACTIONS.PUT:
      return merge(state, payload)

    case ACTIONS.SHOW:
      return merge(state, { [payload]: true })

    case ACTIONS.HIDE:
      return merge(state, { [payload]: false })

    case ACTIONS.RESET:
      // reset custom items
      if (payload) {
        const paths = Array.isArray(payload) ? payload : [payload]

        let output = state
        for (const path of paths) {
          let value = initialState

          for (const key of path.split('.')) {
            value = value[key]
          }

          output = merge(output, { [path]: value })
        }

        return output
      }

      // all reset
      return initialState

    case ACTIONS.CHANGE:
      return merge(state, {
        [payload.target.name]:
          payload.target.type === 'checkbox'
            ? payload.target.checked
            : payload.target.value
      })
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
