import React, { useEffect } from 'react'
import './style.css'
import { css } from 'fx1'

export default function Button ({ children, name, value, type, className, style, readOnly, disabled, onClick = () => {} }) {
  return (
    <article className={css('Button-component', className)} style={style} name={name}>
      <button className='btn btn-primary' onClick={onClick}>{children}</button>
    </article>
  )
}
