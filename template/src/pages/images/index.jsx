import image from 'assets/img/image.webp'
import { Svg, SvgShadow } from 'components'
import { css, useFx } from 'nextia'
import functions from './functions'
import './style.css'
import imageSvg from 'assets/img/image.svg?raw'
import imageCssSvg from 'assets/img/image_css.svg?raw'

export default function ImagesPage() {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('ImagesPage', '')}>
      <article>
        <h2>Static</h2>

        <p>css-img</p>
        <div className="css-img" />

        <p>img</p>
        <img src={image} alt="img" width="64" />

        <p>svg</p>
        <Svg src={imageSvg} width="64" />
      </article>

      <article>
        <h2>Animations</h2>

        <p>svg+css</p>
        <Svg className="svg-css" src={imageSvg} width="64" />

        <p>svg+css (one file)</p>
        <Svg src={imageCssSvg} width="64" />

        <p>svg+css (one file and shadow)</p>
        <SvgShadow src={imageCssSvg} width="64" />
      </article>
    </section>
  )
}
