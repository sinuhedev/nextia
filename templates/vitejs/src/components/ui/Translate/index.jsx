export default function Translate({
  value,
  onChange = () => {},
  className,
  style
}) {
  return (
    <article className={className} style={style}>
      <select value={value.currentLocale} onChange={onChange}>
        {value.locales.map((e) => (
          <option key={e} value={e} className="m-2">
            {e}
          </option>
        ))}
      </select>
    </article>
  )
}
