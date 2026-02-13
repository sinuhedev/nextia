import functions from './functions'
import { useFx, css } from 'nextia'
import './style.css'
import { Message, I18n } from 'components'

export default function TranslatePage() {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('TranslatePage', '')}>
      <I18n value="page.name" args={['Sinuhe', 'Maceda', 'Bouchan']} />

      <ul>
        <li>
          <I18n value="ui.ok" />
        </li>
        <li>
          <I18n value="ui.back" />
        </li>
        <li>
          <I18n value="page.user.family" />
        </li>
        <li>
          <I18n value="page.module.block.docker" />
        </li>
      </ul>

      <Message />
    </section>
  )
}
