import { useEffect, useRef } from 'react'
import icons from 'theme/icons/icons.svg?raw'

export default function Icon({
  id,
  className,
  style,
  width = '48',
  height,
  viewBox = '0 0 48 48',
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = '2',
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  ...props
}) {
  const ref = useRef()

  useEffect(() => {
    const svg = new window.DOMParser()
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
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      {...props}
    />
  )
}
