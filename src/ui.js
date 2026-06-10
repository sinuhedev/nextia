/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import { createElement, useEffect, useRef } from 'react'
import { useCx } from './fx.js'

function I18n({ value, args = [] }) {
  const { context, i18n } = useCx()

  if (!i18n) return null

  try {
    const text = value.split('.').reduce((ac, el) => ac[el], i18n)
    const locale = context.state?.i18n ?? i18n.defaultLocale
    const index = i18n.locales.indexOf(locale)
    let translated = text[index]

    if (args?.length) {
      translated = translated.replace(
        /([{}])\1|[{](.*?)(?:!(.+?))?[}]/g,
        (match, _literal, number) => args[number] ?? match
      )
    }

    return translated
  } catch {
    console.error(`[i18n] key not found: "${value}"`)
    return value
  }
}

function Icon({
  id,
  className,
  style,
  width = '48',
  height,
  viewBox = '0 0 48 48',
  fill = 'none',
  color = 'currentColor',
  stroke = 'currentColor',
  strokeWidth = '2',
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  ...props
}) {
  const { icons } = useCx()
  const ref = useRef()

  useEffect(() => {
    if (!ref.current || !icons) return

    const el = new DOMParser()
      .parseFromString(icons, 'image/svg+xml')
      .documentElement.getElementById(id)

    if (el) ref.current.innerHTML = el.innerHTML
  }, [id, icons])

  return createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    ref,
    id,
    className,
    style,
    width,
    height: height ?? width,
    viewBox,
    fill,
    color,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    ...props
  })
}

function Link({ children, href, value, ...props }) {
  const base = href ?? window.location.hash.split('?')[0]
  const query =
    value && Object.keys(value).length
      ? `?${new URLSearchParams(value).toString()}`
      : ''

  return createElement('a', { href: base + query, ...props }, children)
}

function Svg({ ref, src, width, height, ...props }) {
  ref ??= useRef()

  useEffect(() => {
    fetch(src)
      .then((r) => r.text())
      .then((text) => {
        const svg = new DOMParser().parseFromString(
          text,
          'image/svg+xml'
        ).documentElement

        for (const { name, value } of svg.attributes) {
          if (name !== 'width' && name !== 'height')
            ref.current.setAttribute(name, value)
        }

        ref.current.replaceChildren(...svg.children)
      })
  }, [src, ref])

  return createElement('svg', {
    ref,
    width,
    height: height ?? width,
    ...props
  })
}

export { I18n, Icon, Link, Svg }
