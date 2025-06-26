import { useRef } from 'react'
import './style.css'
import { css } from 'nextia'
import { startViewTransition } from 'utils'

export default function Counter ({
  children,
  name,
  value,
  type,
  className,
  style,
  readOnly,
  disabled,
  animation = 'count',
  onChange
}) {
  const ref = useRef()

  return (
    <article
      className={css('Counter-component', className)}
      style={style}
      name={name}

    >
      <button
        onClick={e => {
          startViewTransition(onChange(e), ref.current, animation)
        }}
      >
        Increment
      </button>

      <label ref={ref}>{value}</label>
    </article>
  )
}
