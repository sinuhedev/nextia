'use client'

/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/fx1
 */

import { createContext, use, useReducer, useCallback } from 'react'

const Context = createContext()

/**
 * css
 */
function css (...classNames) {
  classNames = classNames
    .filter(e => e)
    .reduce((accumulator, currentValue) => {
      if (typeof currentValue === 'string') {
        accumulator.push(currentValue)
      } else if (!Array.isArray(currentValue) && typeof currentValue === 'object') {
        for (const e in currentValue) {
          if (currentValue[e]) accumulator.push(e)
        }
      }
      return accumulator
    }, [])

  return ([...new Set(classNames)]).join(' ')
}

/**
 * values
 */
function values (state, payload, value) {
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

/**
 * merge
 */
function merge (target, source) {
  // in array return all source
  if (Array.isArray(target)) return source

  const isObject = obj => obj && typeof obj === 'object'
  const output = { ...target }

  // merge
  Object.keys(source).forEach(key => {
    if (isObject(target[key]) && isObject(source[key])) {
      output[key] = merge(target[key], source[key])
    } else output[key] = structuredClone(source[key])
  })

  return output
}

/**
 * logger
 */
const Logger = () => {
  let instance

  return {
    getInstance: logger => {
      if (!instance) {
        instance = logger === 'true'
      }
      return instance
    }
  }
}

const logger = Logger().getInstance

const log = (reducer) => {
  const reducerWithLogger = useCallback((state, action) => {
    const newState = reducer(state, action)
    const { type, payload } = action

    console.groupCollapsed('%cAction', 'color: #00A7F7', type)
    console.log('%cPrevious State: ', 'color: #9E9E9E', state)
    console.log('%cAction:\t\t\t', 'color: #00A7F7', { type, payload })
    console.log('%cNew State:\t\t', 'color: #47B04B', newState)
    console.groupEnd()

    return newState
  }, [reducer])

  return reducerWithLogger
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
        payload.target.type === 'checkbox' ? payload.target.checked : payload.target.value
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

/**
 * useFx
 */
function useFx (functions = { initialState: {} }) {
  const context = use(Context)
  const { initialState } = functions
  const [state, dispatch] = useReducer(logger() ? log(reducer) : reducer, initialState)

  // Common actions
  const commonActions = ['set', 'show', 'hide', 'change', 'reset'].reduce((acc, e) => {
    acc[e] = payload => dispatch({ type: e, payload, initialState })
    return acc
  }, {})

  // Actions
  const actions = Object.keys(functions).reduce((ac, e) => {
    if (functions[e] instanceof Function) {
      ac[e] = payload => {
        const props = {
          ...commonActions,
          state,
          payload
        }
        if (context) { props.context = context }

        return functions[e](Object.freeze(props))
      }
    }
    return ac
  }, {})

  // return initialState, state, actions and context
  const props = {
    initialState,
    state,
    fx: { ...commonActions, ...actions }
  }
  if (context) { props.context = context }

  return Object.freeze(props)
}

export { css, Context, logger, useFx }
