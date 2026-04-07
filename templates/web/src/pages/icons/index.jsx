import { css, Icon, useFx } from 'nextia'
import functions from './functions'
import './style.css'

export default function IconsPage() {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('IconsPage', '')}>
      <article>
        <Icon id="globe" width="64" />
        <Icon id="camera" width="64" />
        <Icon id="video" width="64" />
      </article>

      <article>
        <Icon id="exit" animate width="128" />
      </article>
    </section>
  )
}
