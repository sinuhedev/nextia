import React, { useEffect } from 'react'
import functions from './functions'
import { useFx, css } from 'fx1'
import './style.css'
import { Translation } from 'components'
import { I18n } from 'containers'

export default function TranslatePage () {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('TranslatePage', '')}>
      <I18n value='page.name' args={['Sinuhe', 'Maceda', 'Bouchan']} />

      <ul>
        <li>
          <I18n value='ui.ok' />
        </li>
        <li>
          <I18n value='ui.back' />
        </li>
        <li>
          <I18n value='page.user.family' />
        </li>
        <li>
          <I18n value='page.module.block.docker' />
        </li>
        <li><Translation /></li>
      </ul>
    </section>
  )
}
