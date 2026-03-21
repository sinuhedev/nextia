import { css, useFx } from 'nextia'
import functions from './functions'
import './style.css'

export default function ResizePage({ resize }) {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('ResizePage', '')}>
      <pre style={{ margin: '0 50px 0 50px', width: '250px' }}>
        {JSON.stringify(resize, undefined, 2)}
      </pre>
    </section>
  )
}
