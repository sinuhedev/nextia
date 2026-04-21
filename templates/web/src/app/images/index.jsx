import imageSvg from 'assets/img/image.svg?raw'
import image from 'assets/img/image.webp'
import { css, Svg } from 'nextia'
import useFunctions from './functions'
import './style.css'

export default function ImagesPage() {
  const { state, fx } = useFunctions()

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
