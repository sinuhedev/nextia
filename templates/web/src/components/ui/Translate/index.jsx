import { useFx } from 'nextia'

export default function UiTranslate({ className, style }) {
  const { context } = useFx()

  const { currentLocale, locales } = context.state.i18n
  const { changeI18n } = context.fx

  return (
    <article className={className} style={style}>
      <select value={currentLocale} onChange={changeI18n}>
        {locales.map((e) => (
          <option key={e} value={e} className="m-2">
            {e}
          </option>
        ))}
      </select>
    </article>
  )
}
