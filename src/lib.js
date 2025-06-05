'use client'

/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import { useState, createContext, use } from 'react'

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

// Common actions
function commonActions (state, setState, initialState) {
  let newState

  return {
    set: payload => {
      // Merge only item
      if (Object.keys(payload).length === 1) {
        const key = Object.keys(payload)[0]
        newState = values(state, key, payload[key])
      } else {
        // Merge all json
        newState = merge(state, payload)
      }

      setState(newState)
    },

    show: payload => {
      newState = values(state, payload, true)
      setState(newState)
    },

    hide: payload => {
      newState = values(state, payload, false)
      setState(newState)
    },

    change: payload => {
      newState = values(
        state,
        payload.target.name,
        payload.target.type === 'checkbox' ? payload.target.checked : payload.target.value
      )
      setState(newState)
    },

    reset: payload => {
      // value reset
      if (payload) {
        const paths = Array.isArray(payload) ? payload : [payload]

        newState = paths.reduce((ac, path) => {
          const value = path.split('.').reduce((ac, e) => ac[e], initialState)
          return values(ac, path, value)
        }, state)
      } else {
        // all reset
        newState = initialState
      }

      setState(newState)
    }
  }
}

/**
 * useFx
 */
function useFx (functions = { initialState: {} }) {
  const context = use(Context)
  const { initialState } = functions
  const [state, setState] = useState(initialState)

  // Actions
  const actions = Object.keys(functions).reduce((ac, e) => {
    if (functions[e] instanceof Function) {
      ac[e] = payload => {
        const props = {
          ...commonActions(state, setState, initialState),
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
    fx: { ...commonActions(state, setState, initialState), ...actions }
  }
  if (context) { props.context = context }

  return Object.freeze(props)
}

export { css, useFx, Context }
