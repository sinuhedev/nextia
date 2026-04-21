/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import { createContext, use, useReducer } from 'react'
import { env } from './utils.js'

const LOGGER = env.DEV && env.PUBLIC_LOGGER !== 'false'
const Pages = createContext()

/**
 * util
 */

function values(state, payload, value) {
  const paths = payload.split('.')

  // one level
  if (paths.length === 1) {
    // set Object and exist Object
    if (value && typeof value === 'object' && Object.keys(value).length) {
      return { ...state, [payload]: { ...state[payload], ...value } }
    }

    // set Value
    return {
      ...state,
      [payload]: value
    }
  }

  // multi level
  const stateClone = structuredClone(state)
  const finalPath = paths.pop()
  const stateRef = paths.reduce((ac, e) => ac[e], stateClone)
  stateRef[finalPath] = value

  return stateClone
}

function merge(target, source) {
  // in array return all source
  if (Array.isArray(target)) return source

  const isObject = (obj) => obj && typeof obj === 'object'
  const output = { ...target }

  // merge
  Object.keys(source).forEach((key) => {
    if (isObject(target[key]) && isObject(source[key])) {
      output[key] = merge(target[key], source[key])
    } else output[key] = structuredClone(source[key])
  })

  return output
}

/**
 * reducer
 */

const reducer = (state, action) => {
  const { type, payload, initialState } = action

  switch (type) {
    case 'set':
      // Merge only item
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
      // value reset
      if (payload) {
        const paths = Array.isArray(payload) ? payload : [payload]

        return paths.reduce((ac, path) => {
          const value = path.split('.').reduce((ac, e) => ac[e], initialState)
          return values(ac, path, value)
        }, state)
      }

      // all reset
      return initialState
  }
}

const reducerLogger = (state, action) => {
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
    `%c${action.isContext ? 'Pages Context' : 'Page'} %c${action.type}`,
    'color: #90b1d1',
    'color: #6592c8',
    payloadLog(action),
    { state, new_state: newState }
  )

  return newState
}

/**
 * useFx
 */

function useFx(functions = { initialState: {} }) {
  const pages = use(Pages)
  const { initialState } = functions
  const [state, dispatch] = useReducer(
    LOGGER ? reducerLogger : reducer,
    initialState
  )

  // Common actions
  const commonActions = ['set', 'show', 'hide', 'change', 'reset'].reduce(
    (acc, e) => {
      acc[e] = (payload) =>
        dispatch({
          type: e,
          payload,
          initialState,
          isContext: !pages?.context
        })
      return acc
    },
    {}
  )

  // Actions
  const actions = Object.keys(functions).reduce((ac, e) => {
    if (functions[e] instanceof Function) {
      ac[e] = (payload) => {
        const actionsProps = {
          ...commonActions,
          state,
          payload,
          context: pages?.context
        }

        return functions[e](Object.freeze(actionsProps))
      }
    }
    return ac
  }, {})

  // return initialState, state, actions and context
  const props = {
    initialState,
    state,
    fx: { ...commonActions, ...actions },
    //
    context: pages?.context,
    iconsFile: pages?.iconsFile,
    i18nFile: pages?.i18nFile
  }

  return Object.freeze(props)
}

export { Pages, useFx }
