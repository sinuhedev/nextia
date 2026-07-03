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
const COMMON_TYPES = ['set', 'show', 'hide', 'change', 'reset']

/**
 * util
 */

const isObject = (obj) =>
  obj !== null && typeof obj === 'object' && !Array.isArray(obj)

function values(state, payload, value) {
  const dot = payload.indexOf('.')

  // one level
  if (dot === -1) {
    // set Object and exist Object
    if (isObject(value) && isObject(state[payload]))
      return { ...state, [payload]: { ...state[payload], ...value } }

    // set Value
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

    output[key] = isObject(tVal) && isObject(sVal) ? merge(tVal, sVal) : sVal
  }

  return output
}

/**
 * reducer
 */

const reducer = (state, { type, payload, initialState }) => {
  switch (type) {
    case 'set':
      // Merge custom items
      if (Object.keys(payload).length === 1) {
        const key = Object.keys(payload)[0]
        return values(state, key, payload[key])
      }

      // Merge all json
      return merge(state, payload)

    case 'show':
      return values(state, payload, true)

    case 'hide':
      return values(state, payload, false)

    case 'change':
      return values(
        state,
        payload.target.name,
        payload.target.type === 'checkbox'
          ? payload.target.checked
          : payload.target.value
      )

    case 'reset':
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

const reducerWithLogger = (state, action) => {
  const newState = reducer(state, action)

  const payloadLog = (action) => {
    const { type, payload } = action

    if (type === 'change') {
      const { name, type, checked, value } = payload.target
      return {
        name,
        type,
        checked,
        value
      }
    }

    if (typeof payload !== 'object') {
      return `(${payload ?? ''})`
    }

    return payload
  }

  console.log(
    `%c${action.isContext ? 'Context' : 'Page'} %c${action.type}`,
    'color: #90b1d1',
    'color: #6592c8',
    payloadLog(action),
    { state, new_state: newState }
  )

  return newState
}

/**
 * useCx and useFx
 */

function useCx() {
  const pages = use(Pagex)

  return {
    context: pages?.context,
    i18n: pages?.i18n,
    icons: pages?.icons,
    logger: pages?.logger ?? false
  }
}

function useFx(functions = { initialState: {} }) {
  const { initialState } = functions

  // Context
  const cx = useCx()

  // Reducer
  const [state, dispatch] = useReducer(
    cx.logger ? reducerWithLogger : reducer,
    initialState
  )

  // Common actions
  const commonActions = COMMON_TYPES.reduce((acc, type) => {
    acc[type] = (payload) =>
      dispatch({
        type,
        payload,
        initialState,
        isContext: !cx?.context
      })
    return acc
  }, {})

  // Actions
  const actions = Object.entries(functions).reduce((acc, [key, fn]) => {
    if (typeof fn === 'function')
      acc[key] = (payload) =>
        fn(
          Object.freeze({
            ...commonActions,
            state,
            payload,
            context: cx.context
          })
        )
    return acc
  }, {})

  return Object.freeze({
    initialState,
    state,
    fx: { ...commonActions, ...actions },
    context: cx.context
  })
}

export { Pagex, useCx, useFx }
