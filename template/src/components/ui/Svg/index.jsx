import { useEffect, useRef } from 'react'

export default function Svg({ ref, src, width, height, ...props }) {
  ref ??= useRef()

  useEffect(() => {
    try {
      const el = ref.current

      // 1. Lee los atributos del DOM directamente (los que React ya aplicó)
      const savedAttrs = el.getAttributeNames().map((name) => ({
        name,
        value: el.getAttribute(name)
      }))

      // 2. Aplica los atributos del SVG parseado
      const svg = new window.DOMParser().parseFromString(
        src,
        'image/svg+xml'
      ).documentElement

      Array.from(svg.attributes).forEach((attr) => {
        el.setAttribute(attr.name, attr.value)
      })

      // 3. Reaplica los atributos del DOM (sobreescriben los del SVG)
      savedAttrs.forEach(({ name, value }) => {
        el.setAttribute(name, value)
      })

      el.replaceChildren(...svg.children)
    } catch (e) {
      console.error(e)
    }
  }, [ref, src])

  return <svg ref={ref} width={width} height={height ?? width} {...props} />
}
