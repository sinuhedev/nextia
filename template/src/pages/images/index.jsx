import image from 'assets/img/image.webp'
import { Svg } from 'components'
import { css, useFx } from 'nextia'
import functions from './functions'
import './style.css'
import jsSvg from 'assets/img/js.svg?raw'

export default function ImagesPage() {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('ImagesPage', '')}>
      <br />
      <p>css-img</p>
      <div className="css-img" />

      <br />
      <p>img</p>
      <img src={image} alt="img" width="128" />

      <br />
      <p>svg</p>
      <Svg src={jsSvg} width="128" />
    </section>
  )
}
