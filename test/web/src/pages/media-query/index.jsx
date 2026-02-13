import { css, useFx } from 'nextia'
import functions from './functions'
import './style.css'

export default function MediaQueryPage({ resize }) {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('MediaQueryPage', '')}>
      <div>
        <section>CSS @container </section>

        <ul>
          <li className="sm">SM</li>
          <li className="md">MD</li>
          <li className="lg">LG</li>
          <li className="xl">XL</li>
          <li className="xxl">XXL</li>
        </ul>

        <pre style={{ margin: '0 50px 0 50px', width: '250px' }}>
          state = {JSON.stringify(resize, undefined, 2)}
        </pre>
      </div>
    </section>
  )
}
