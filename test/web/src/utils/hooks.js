import { useCallback, useEffect, useState } from 'react'

export function useQueryString() {
  const getQueryString = useCallback(
    () => ({
      hash: window.location.hash.split('?')[0],
      queryString: Object.fromEntries(
        new URLSearchParams(window.location.hash.split('?')[1])
      )
    }),
    []
  )

  const [queryString, setQueryString] = useState(getQueryString)

  useEffect(() => {
    const handlePopState = () => setQueryString(getQueryString())

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [getQueryString])

  return queryString
}

export function useResize() {
  const getResize = useCallback(() => {
    const cssVar = (e) =>
      window.getComputedStyle(document.body).getPropertyValue(e) === 'true'

    return {
      width: window.innerWidth,
      height: window.innerHeight,
      sm: cssVar('--sm'),
      md: cssVar('--md'),
      lg: cssVar('--lg'),
      xl: cssVar('--xl'),
      xxl: cssVar('--xxl')
    }
  }, [])

  const [resize, setResize] = useState(getResize)

  useEffect(() => {
    const handleResize = () => setResize(getResize())

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [getResize])

  return resize
}
