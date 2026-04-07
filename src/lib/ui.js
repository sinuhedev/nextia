/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import { createElement, useEffect, useRef } from 'react'
import { useFx } from './fx'
import { css } from './utils'

function Link({ children, href, value = {}, ...props }) {
  href ??= window.location.hash.split('?')[0]
  value = Object.keys(value).length
    ? `?${new URLSearchParams(value).toString()}`
    : ''

  return createElement('a', { href: href + value, ...props }, children)
}

function I18n({ value, args = [] }) {
  const { context, i18nFile } = useFx()

  if (i18nFile) {
    try {
      let text = value.split('.').reduce((ac, el) => ac[el], i18nFile)

      text =
        text[
          i18nFile.locales.indexOf(
            context.state?.i18n || i18nFile.defaultLocale
          )
        ]

      if (args) {
        text = text.replace(
          /([{}])\\1|[{](.*?)(?:!(.+?))?[}]/g,
          (match, _literal, number) => args[number] || match
        )
      }

      return text
    } catch {
      console.error(`Error in [il8n] => ${value}`)
      return value
    }
  }
}

function Icon({
  id,
  className,
  animate = false,
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
  const { iconsFile } = useFx()
  const ref = useRef()

  useEffect(() => {
    if (iconsFile) {
      const svg = new DOMParser()
        .parseFromString(iconsFile, 'image/svg+xml')
        .documentElement.getElementById(id)

      if (svg) {
        ref.current.innerHTML = svg.innerHTML
      }
    }
  }, [id, iconsFile])

  return createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    ref,
    id,
    className: css({ 'nextia-animate-icon': animate }, className),
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

function Svg({ ref, src, width, height, ...props }) {
  ref ??= useRef()

  useEffect(() => {
    const svg = new DOMParser().parseFromString(
      src,
      'image/svg+xml'
    ).documentElement

    for (const { name, value } of svg.attributes) {
      if (name !== 'width' && name !== 'height')
        ref.current.setAttribute(name, value)
    }

    ref.current.replaceChildren(...svg.children)
  }, [src, ref])

  return createElement('svg', {
    ref,
    width,
    height: height ?? width,
    ...props
  })
}

export { I18n, Icon, Link, Svg }
