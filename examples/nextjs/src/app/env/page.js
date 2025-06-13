'use client'

import React, { useEffect } from 'react'
import { useFx, css } from 'fx1'
import functions from './functions'
import './style.css'

export default function EnvPage () {
  const { state, fx } = useFx(functions)

  // env
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_TITLE)
  }, [])

  return (
    <section className={css('EnvPage', '')}>
      EnvPage

      <h1>{process.env.NEXT_PUBLIC_TITLE}</h1>

    </section>
  )
}
