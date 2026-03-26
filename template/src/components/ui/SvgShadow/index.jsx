import { useEffect, useRef } from 'react'

export default function UiSvgShadow({ src, width, height, ...props }) {
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return

    const svg = new DOMParser()
      .parseFromString(src, 'image/svg+xml')
      .querySelector('svg')

    svg.setAttribute('width', width)
    svg.setAttribute('height', height ?? width)

    for (const [name, value] of Object.entries(props)) {
      svg.setAttribute(name, value)
    }

    const shadow =
      ref.current.shadowRoot ?? ref.current.attachShadow({ mode: 'open' })
    shadow.innerHTML = svg.outerHTML

    ref.current.style.width = `${width}px`
    ref.current.style.height = `${height ?? width}px`
  }, [src, width, height, props])

  return <div ref={ref} />
}
