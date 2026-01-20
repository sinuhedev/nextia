import React, { useEffect } from 'react'
import { useFx, css } from 'nextia'
import { Icon } from 'components'
import functions from './functions'
import './style.css'

export default function IconsPage () {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('IconsPage', '')}>
      <Icon value='globe' width='32' />
      <Icon value='camera' width='32' />
      <Icon value='video' width='32' />
    </section>
  )
}
