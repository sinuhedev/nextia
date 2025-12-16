import React, { useEffect } from 'react'
import './style.css'
import { css } from 'nextia'
import { I18n } from 'containers'

export default function Messages ({ children, name, value, type, className, style, readOnly, disabled, onClick = () => {} }) {
  return (
    <article className={css('Messages-component', className)} style={style} name={name}>
      Message-component : <span><I18n value='page.user.family' /></span>
    </article>
  )
}
