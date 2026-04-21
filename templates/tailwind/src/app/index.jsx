import { Button } from 'components'
import { css } from 'nextia'
import useFunctions from './functions'
import './style.css'

export default function App() {
  const { state, fx } = useFunctions()

  return (
    <main className={css('App', 'm-5')}>
      <div className="flex">
        <Button onClick={(e) => fx.increment(e)}>+</Button>
        <Button onClick={(e) => fx.decrement(e)}>-</Button>
      </div>

      <div style={{ display: 'flex' }}>
        <pre style={{ margin: '0 50px 0 50px' }}>
          state = {JSON.stringify(state, undefined, 2)}
        </pre>
      </div>

      <br />

      <div className="grid grid-cols-12">
        <div className="col-span-6">col-span-6</div>
        <div className="col-span-6">col-span-6</div>
      </div>

      <br />
      <br />
      <br />

      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-6">
          col-span-12 md:col-span-6
        </div>
        <div className="col-span-12 md:col-span-6">
          col-span-12 md:col-span-6
        </div>
      </div>
    </main>
  )
}
