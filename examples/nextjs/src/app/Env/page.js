'use client'

import React, { useEffect } from 'react'
import { useFx, css } from 'nextia'
import functions from './functions'
import './style.css'

export default function Env () {
  const { state, fx } = useFx(functions)

  // env
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_TITLE)
  }, [])

  return (
    <section className={css('Env', '')}>
      Env

      <h1>{process.env.NEXT_PUBLIC_TITLE}</h1>

    </section>
  )
}
