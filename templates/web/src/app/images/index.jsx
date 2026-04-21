import image from 'assets/img/image.webp'
import { css, Svg, useFx } from 'nextia'
import functions from './functions'
import './style.css'
import imageSvg from 'assets/img/image.svg?raw'

export default function ImagesPage() {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('ImagesPage', '')}>
      <p>css-img</p>
      <div className="css-img" />

      <p>img</p>
      <img src={image} alt="img" width="64" />

      <p>svg</p>
      <Svg src={imageSvg} width="64" />

      <p>svg+css</p>
      <Svg className="svg-css" src={imageSvg} width="64" />
    </section>
  )
}
