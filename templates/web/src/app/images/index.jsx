import imageSvg from 'assets/img/image.svg'
import image from 'assets/img/image.webp'
import { Svg } from 'nextia'

export default function ImagesPage() {
  return (
    <section className="m-2">
      <p>css-img</p>
      <div className="css-img" />

      <br />

      <p>img</p>
      <img src={image} alt="img" width="64" />

      <br />
      <br />

      <p>svg</p>
      <Svg src={imageSvg} width="64" />

      <br />
      <br />

      <p>svg+css</p>
      <Svg src={imageSvg} className="svg-css" width="64" />
    </section>
  )
}
