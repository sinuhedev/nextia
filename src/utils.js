/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

/**
 * css
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

/**
 * getVersion
 */
const getVersion = () => {
  if (typeof document === 'undefined') return {}

  const content = document.querySelector('meta[name="version"]')?.content
  if (!content) return {}

  return Object.fromEntries(content.split(', ').map((item) => item.split('=')))
}

/**
 * View Transition
 */

async function startViewTransition(fun = () => {}, ref, animation) {
  if (!document.startViewTransition || !animation) return fun()

  ref.style.viewTransitionName = animation
  await document.startViewTransition(fun).finished
  ref.style.viewTransitionName = ''
}

class Resources {
  static #instance = null

  #i18n
  #icons
  #state = {}
  #listeners = new Set() // ← lista de suscriptores

  constructor({ i18n, icons }) {
    this.#i18n = Object.freeze(i18n)
    this.#icons = Object.freeze(icons)
  }

  static getInstance(data) {
    if (!Resources.#instance) {
      Resources.#instance = new Resources(data)
    }
    return Resources.#instance
  }

  get i18n() {
    return this.#i18n
  }

  get icons() {
    return this.#icons
  }

  set(key, value) {
    this.#state[key] = value
    this.#notify()
  }

  get(key) {
    return this.#state[key]
  }

  getAll() {
    return { ...this.#state }
  }

  clear() {
    this.#state = {}
    this.#notify()
  }

  subscribe(callback) {
    this.#listeners.add(callback)
    return () => this.#listeners.delete(callback)
  }

  #notify() {
    for (const callback of this.#listeners) {
      callback(this.getAll())
    }
  }
}

export { css, getVersion, Resources, startViewTransition }
