import { css } from 'nextia'
import { useEffect, useRef } from 'react'
import icons from 'theme/icons/icons.svg?raw'

export default function UiIcon({
  id,
  className,
  animate = false,
  style,
  width = '48',
  height,
  viewBox = '0 0 48 48',
  fill = 'none',
  color = 'currentColor',
  stroke = 'currentColor',
  strokeWidth = '2',
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  ...props
}) {
  const ref = useRef()

  useEffect(() => {
    const svg = new DOMParser()
      .parseFromString(icons, 'image/svg+xml')
      .documentElement.getElementById(id)

    if (svg) {
      ref.current.innerHTML = svg.innerHTML
    }
  }, [id])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      id={id}
      className={css({ 'nextia-animate-icon': animate }, className)}
      style={style}
      width={width}
      height={height ?? width}
      viewBox={viewBox}
      fill={fill}
      color={color}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      {...props}
    />
  )
}
