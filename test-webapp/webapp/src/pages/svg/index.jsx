import { css, useFx } from 'nextia'
import functions from './functions'
import './style.css'
import { Svg } from 'components'
import file from 'theme/icons/exit.svg?raw'

export default function SvgPage() {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('SvgPage', '')}>
      <Svg src={file} />
    </section>
  )
}
