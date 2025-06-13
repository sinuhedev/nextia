import React, { useEffect, useState, flushSync, useRef } from 'react'
import './style.css'
import { css } from 'fx1'
import { startViewTransition } from 'utils'

export default function Counter ({
  children,
  name,
  value,
  type,
  className,
  style,
  readOnly,
  disabled,
  onChange,
  animation = 'count'
}) {
  const ref = useRef()

  return (
    <article
      className={css('Counter-component', className)}
      style={style}
      name={name}
    >
      <button
        onClick={e => {
          startViewTransition(onChange(e), ref.current, animation)
        }}
      >
        Increment
      </button>

      <label ref={ref}>{value}</label>
    </article>
  )
}
