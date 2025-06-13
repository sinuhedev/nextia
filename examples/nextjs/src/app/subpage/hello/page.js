'use client'

import React, { useEffect } from 'react'
import { useFx, css } from 'fx1'
import functions from './functions'
import './style.css'

export default function SubpageHelloPage () {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('SubpageHelloPage', '')}>
      SubPage / Hello
    </section>
  )
}
