/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import { lazy, useCallback, useEffect, useState } from 'react'
import { startViewTransition } from './utils'

/**
 * useQueryString
 */

function useQueryString() {
  const getQueryString = useCallback(() => {
    const [hash, search = ''] = window.location.hash.split('?')
    return {
      hash,
      queryString: Object.fromEntries(new URLSearchParams(search))
    }
  }, [])

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

/**
 * useResize
 */

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

/**
 * usePage
 */

function usePage({
  hash,
  importPage = () => {},
  viewTransition = {
    ref: null,
    name: ''
  }
}) {
  const [Page, setPage] = useState()
  const { ref, name = '' } = viewTransition

  useEffect(() => {
    const page = lazy(async () => {
      const normalizeHash = ['', '#/'].includes(hash) ? '#/home' : hash
      const path = normalizeHash.substring(2).split('/').filter(Boolean)

      try {
        return await importPage(path)
      } catch (e) {
        console.error(e)
        return await importPage()
      }
    })

    startViewTransition(() => setPage(page), ref.current, name)
  }, [hash, ref, name])

  return Page
}

export { usePage, useQueryString, useResize }
