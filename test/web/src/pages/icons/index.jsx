import { Icon } from 'components'
import { css, useFx } from 'nextia'
import functions from './functions'
import './style.css'

export default function IconsPage() {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('IconsPage', '')}>
      <Icon id="globe" width="32" />
      <Icon id="camera" width="32" />
      <Icon id="video" width="32" />
      <Icon id="exit" width="32" />
      <Icon id="exit" className="exit-anim" width="32" />
    </section>
  )
}
