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
