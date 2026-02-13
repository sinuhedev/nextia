import { I18n } from 'components'

export default function Messages({ name, className, style }) {
  return (
    <article className={className} style={style} name={name}>
      Message-component :{' '}
      <span>
        <I18n value="page.user.family" />
      </span>
    </article>
  )
}
