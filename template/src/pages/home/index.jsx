import './style.css'
import { css, useFx } from 'nextia'
import functions from './functions'

export default function HomePage() {
  const { state, initialState, fx, context } = useFx(functions)

  return <section className={css('HomePage', 'container')}>homePage</section>
}
