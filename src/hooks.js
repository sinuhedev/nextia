/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import { lazy, useCallback, useEffect, useState } from 'react'
import { Resources, startViewTransition } from './utils'

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
 * usePage
 */

function usePage({
  hash,
  homePage = '#/home',
  importPage = () => {},
  viewTransition = {
    ref: null,
    name: ''
  }
}) {
  const [Page, setPage] = useState()
  const { ref, name = '' } = viewTransition

  useEffect(() => {
    const page = lazy(() => {
      const normalizeHash = ['', '#/'].includes(hash) ? homePage : hash
      const path = normalizeHash.substring(2).split('/').filter(Boolean)

      // importPage return to Promise
      return importPage(path).catch((e) => {
        console.error(e)
        return importPage() // fallback
      })
    })

    startViewTransition(() => setPage(page), ref.current, name)
  }, [hash, homePage, ref, name])

  return Page
}

function useResources() {
  const [, setResources] = useState(() => Resources.getInstance().getAll())

  useEffect(() => {
    return Resources.getInstance().subscribe(setResources)
  }, [])
}

export { usePage, useQueryString, useResources }
