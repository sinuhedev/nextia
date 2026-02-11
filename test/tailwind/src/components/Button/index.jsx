import React, { useEffect } from 'react'
import './style.css'
import { css } from 'nextia'

export default function Button({
  children,
  name,
  value,
  type,
  className,
  style,
  readOnly,
  disabled,
  onClick = () => {}
}) {
  return (
    <article
      className={css('Button-component', className)}
      style={style}
      name={name}
    >
      <button type="button" className="btn-primary" onClick={onClick}>
        {children}
      </button>
    </article>
  )
}
