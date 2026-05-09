import i18n from 'assets/i18n.json'
import icons from 'assets/icons.svg'
import { Translate } from 'components'
import {
  I18n,
  Icon,
  Link,
  Pagex,
  startViewTransition,
  useQueryString,
  useResize
} from 'nextia'
import { lazy, useEffect, useRef, useState } from 'react'
import { WINDOW_RESIZE } from 'utils'
import useFunctions from './functions.js'

export default function Pages() {
  const pages = useFunctions()
  const { state, fx } = pages

  const [Page, setPage] = useState()
  const qs = useQueryString()
  const resize = useResize(WINDOW_RESIZE)
  const ref = useRef()

  useEffect(() => {
    const hash = ['', '#/'].includes(qs.hash) ? '#/home' : qs.hash

    const page = lazy(async () => {
      const path = hash.substring(2).split('/')

      try {
        if (path.length === 1) {
          return await import(`./${path[0]}/index.jsx`)
        } else if (path.length === 2) {
          return await import(`./${path[0]}/${path[1]}/index.jsx`)
        }
      } catch (e) {
        console.error(e)
        return await import('./not-found.jsx')
      }
    })

    startViewTransition(setPage(page), ref.current)
  }, [qs.hash])

  return (
    <Pagex value={{ context: pages, icons, i18n }}>
      <header style={{ display: 'flex', gap: '20px', margin: '20px' }}>
        <Icon id="globe" width="24" />

        <Translate />

        <I18n value="page.name" args={['Sinuhe', 'Maceda', 'Bouchan']} />

        <button
          type="button"
          className="btn-md"
          onClick={(e) => fx.increment(e)}
        >
          increment
        </button>
        {'  '}
        <button
          type="button"
          className="btn-md"
          onClick={(e) => fx.decrement(e)}
        >
          decrement
        </button>
        {'  '}
        <button
          type="button"
          className="btn-md"
          onClick={() => fx.zero({ value: 0 })}
        >
          zero
        </button>
        {'  '}
        {state.num}
        {'  '}
        {state.loading ? <span> Loading... </span> : <span> View.. </span>}
      </header>

      <main ref={ref} className="m-2">
        {Page && <Page qs={qs.queryString} resize={resize} />}
      </main>
    </Pagex>
  )
}
