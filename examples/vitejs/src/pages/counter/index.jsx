import React, { useEffect } from 'react'
import { useFx, css } from 'fx1'
import functions from './functions'
import { Counter } from 'components'
import './style.css'

export default function CounterPage () {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('CounterPage', '', 'class-test', 'class-test', {}, null, true, false, [], { 'css-false': false }, undefined, { 'css-true': true }, { 'css-true': true })}>

      Counters

      <div className={css(null)} />
      <div className={css(undefined)} />
      <div className={css([])} />
      <div className={css({})} />
      <div className={css()} />

      <Counter
        value={state.count}
        animation='count'
        onChange={() => {
          fx.set({ count: state.count + 1 })
        }}
      />
      <br />
      <br />
      <Counter
        value={state.count2}
        animation='count2'
        onChange={() => {
          fx.set({ count2: state.count2 + 10 })
        }}
      />
    </section>
  )
}
