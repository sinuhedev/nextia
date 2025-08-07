'use client'

import React, { useEffect } from 'react'
import { useFx, css } from 'nextia'
import functions from './functions'
import './style.css'

export default function MyContextPage () {
  const { state, fx, context } = useFx(functions)

  useEffect(() => {
    fx.init()
  }, [])

  return (
    <section className={css('MyContextPage', '')}>
      <br />
      <button onClick={e => context.fx.increment(e)}>increment</button>
      {'  '}
      <button onClick={e => context.fx.decrement(e)}>decrement</button>
      {'  '}
      <button onClick={() => context.fx.zero({ value: 0 })}>zero</button>
      {'  '}
      {context.state.num}
    </section>
  )
}
