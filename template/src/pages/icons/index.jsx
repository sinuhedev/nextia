import { Icon, Svg } from 'components'
import { css, useFx } from 'nextia'
import functions from './functions'
import './style.css'
import exitSvg from 'theme/icons/exit.svg?raw'

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
        <Svg src={exitSvg} width="256" />
      </article>
    </section>
  )
}
