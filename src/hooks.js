/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import { useCallback, useEffect, useState } from 'react'

function useQueryString() {
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

function useResize({ md = 768, lg = 1024, xl = 1280 }) {
  const getResize = useCallback(
    () => ({
      width: window.innerWidth,
      height: window.innerHeight,
      sm: window.innerWidth < md,
      md: window.innerWidth >= md && window.innerWidth < lg,
      lg: window.innerWidth >= lg && window.innerWidth < xl,
      xl: window.innerWidth >= xl
    }),
    [md, lg, xl]
  )

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

export { useQueryString, useResize }
