import { Counter } from 'components'
import { css, useFx } from 'nextia'
import functions from './functions'
import './style.css'

export default function ViewTransitionPage() {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('ViewTransitionPage')}>
      Counters
      <Counter
        value={state.count}
        animation="count"
        onChange={() => {
          fx.set({ count: state.count + 1 })
        }}
      />
      <br />
      <br />
      <Counter
        value={state.count2}
        animation="count2"
        onChange={() => {
          fx.set({ count2: state.count2 + 10 })
        }}
      />
    </section>
  )
}
