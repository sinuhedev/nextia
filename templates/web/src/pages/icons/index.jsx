import { css, Icon, useFx } from 'nextia'
import functions from './functions'
import './style.css'

export default function IconsPage() {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('IconsPage', '')}>
      <article>
        <Icon id="globe" width="32" />
        <Icon id="camera" width="32" />
        <Icon id="video" width="32" />
      </article>

      <article>
        <Icon id="exit" animate width="32" />
      </article>
    </section>
  )
}
