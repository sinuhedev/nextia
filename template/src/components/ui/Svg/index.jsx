import { useEffect, useRef } from 'react'

export default function Svg({ ref, src, width, height, ...props }) {
  ref ??= useRef()

  useEffect(() => {
    const svg = new window.DOMParser().parseFromString(
      src,
      'image/svg+xml'
    ).documentElement

    for (const { name, value } of svg.attributes) {
      if (name !== 'width' && name !== 'height')
        ref.current.setAttribute(name, value)
    }

    ref.current.replaceChildren(...svg.children)
  }, [src, ref])

  return <svg ref={ref} width={width} height={height ?? width} {...props} />
}
