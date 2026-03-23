import { useEffect, useRef } from 'react'

export default function UiSvg({
  src,
  width = '48',
  height,
  viewBox = '0 0 48 48',
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = '2',
  strokeLinecap = 'round',
  strokeLinejoin = 'round'
}) {
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return

    const svg = new DOMParser()
      .parseFromString(src, 'image/svg+xml')
      .querySelector('svg')

    svg.setAttribute('width', width)
    svg.setAttribute('height', height ?? width)
    svg.setAttribute('viewBox', viewBox)
    svg.setAttribute('fill', fill)
    svg.setAttribute('stroke', stroke)
    svg.setAttribute('stroke-width', strokeWidth)
    svg.setAttribute('stroke-linecap', strokeLinecap)
    svg.setAttribute('stroke-linejoin', strokeLinejoin)

    const shadow =
      ref.current.shadowRoot ?? ref.current.attachShadow({ mode: 'open' })
    shadow.innerHTML = svg.outerHTML

    ref.current.style.width = `${width}px`
    ref.current.style.height = `${height ?? width}px`
  }, [
    src,
    width,
    height,
    viewBox,
    fill,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin
  ])

  return <div ref={ref} />
}
