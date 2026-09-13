/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import { useMemo, useReducer } from 'react'

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
 * reducer
 */

function reducer(state, action) {
  const { type, payload, initialState } = action

  switch (type) {
    case ACTIONS.PUT:
      return merge(state, isFlatten(payload) ? unflatten(payload) : payload)

    case ACTIONS.SHOW:
      return merge(state, unflatten({ [payload]: true }))

    case ACTIONS.HIDE:
      return merge(state, unflatten({ [payload]: false }))

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

          output = merge(output, unflatten({ [path]: value }))
        }

        return output
      }

      // all reset
      return initialState

    case ACTIONS.CHANGE:
      return merge(
        state,
        unflatten({
          [payload.target.name]:
            payload.target.type === 'checkbox'
              ? payload.target.checked
              : payload.target.value
        })
      )
  }
}

/**
 * useFx
 */

function useFx(functions = { initialState: {} }, init) {
  // initialState
  const { initialState } = functions

  // Reducer
  const [state, dispatch] = useReducer(reducer, initialState, init)

  // Actions
  const actions = useMemo(() => {
    const acts = {}

    for (const type of Object.values(ACTIONS)) {
      acts[type] = (payload) =>
        dispatch({
          type,
          payload,
          initialState
        })
    }

    return acts
  }, [initialState])

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

export { useFx }
