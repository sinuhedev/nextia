import imageSvg from 'assets/img/image.svg'
import image from 'assets/img/image.webp'
import { css, Svg } from 'nextia'
import './style.css'

export default function ImagesPage() {
  return (
    <section className={css('ImagesPage', '')}>
      <p>css-img</p>
      <div className="css-img" />

      <p>img</p>
      <img src={image} alt="img" width="64" />

      <p>svg</p>
      <Svg src={imageSvg} width="64" />

      <p>svg+css</p>
      <Svg src={imageSvg} className="svg-css" width="64" />
    </section>
  )
}
