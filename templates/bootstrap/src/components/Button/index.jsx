import { css } from 'nextia'
import './style.css'

export default function Button({
  children,
  name,
  className,
  style,
  onClick = () => {}
}) {
  return (
    <article
      className={css('Button-component', className)}
      style={style}
      name={name}
    >
      <button type="button" className="btn btn-primary" onClick={onClick}>
        {children}
      </button>
    </article>
  )
}
