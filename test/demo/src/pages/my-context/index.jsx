import React, { useEffect } from 'react'
import { useFx, css } from 'nextia'
import functions from './functions'
import './style.css'

export default function MyContext() {
  const { state, fx, context } = useFx(functions)

  // biome-ignore lint/correctness/useExhaustiveDependencies: fx is stable and init should only run once
  useEffect(() => {
    fx.init()
  }, [])

  return (
    <section className={css('MyContext', '')}>
      <br />
      <button type="button" onClick={(e) => context.fx.increment(e)}>
        increment
      </button>
      {'  '}
      <button type="button" onClick={(e) => context.fx.decrement(e)}>
        decrement
      </button>
      {'  '}
      <button type="button" onClick={() => context.fx.zero({ value: 0 })}>
        zero
      </button>
      {'  '}
      {context.state.num}
    </section>
  )
}
