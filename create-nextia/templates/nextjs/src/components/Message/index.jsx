import React, { useEffect } from 'react'
import './style.css'
import { css } from 'nextia'
import { I18n } from 'containers'

export default function Message ({ children, name, value, type, className, style, readOnly, disabled, onClick = () => {} }) {
  return (
    <article className={css('Message-component', className)} style={style} name={name}>
      Message-component : <span><I18n value='page.user.family' /></span>
    </article>
  )
}
