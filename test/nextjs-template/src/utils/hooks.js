import { useEffect, useState } from 'react'

export function useResize () {
  const cssVar = (e) => window.getComputedStyle(document.body).getPropertyValue(e) === 'true'

  const getResize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
    sm: cssVar('--sm'),
    md: cssVar('--md'),
    lg: cssVar('--lg'),
    xl: cssVar('--xl'),
    xxl: cssVar('--xxl')
  })

  const [resize, setResize] = useState(getResize())

  useEffect(() => {
    window.addEventListener('resize', () => setResize(getResize()))
    return () => {
      window.removeEventListener('resize', () => setResize(getResize()))
    }
  }, [])

  return resize
}
