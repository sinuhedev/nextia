import { useEffect, useState, useRef, lazy } from 'react'
import { useFx, Context } from 'nextia'
import { Icon, Link, Translate, I18n } from 'components'
import functions from './functions.js'
import { startViewTransition, useResize, useQueryString } from 'utils'

export default function Pages() {
  const self = useFx(functions)
  const { state, fx } = self

  const [Page, setPage] = useState()
  const qs = useQueryString()
  const resize = useResize()

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
        return await import('./http/not-found/index.jsx')
      }
    })

    startViewTransition(setPage(page), ref.current, 'fade')
  }, [qs.hash])

  return (
    <Context value={self}>
      <header style={{ display: 'flex', gap: '20px' }}>
        <Icon id="globe" width="24" />

        <Translate
          value={state.i18nLocale}
          onChange={(e) => fx.changeI18n(e)}
        />

        <I18n value="page.name" args={['Sinuhe', 'Maceda', 'Bouchan']} />

        <button type="button" onClick={(e) => fx.increment(e)}>
          increment
        </button>
        {'  '}
        <button type="button" onClick={(e) => fx.decrement(e)}>
          decrement
        </button>
        {'  '}
        <button type="button" onClick={() => fx.zero({ value: 0 })}>
          zero
        </button>
        {'  '}
        {state.num}
        {'  '}
        {state.loading ? <span> Loading... </span> : <span> View.. </span>}
      </header>

      <aside className="m-2">
        <Link href="/" className="mr-2">
          /
        </Link>
        <Link href="#/" className="mr-2">
          /home
        </Link>
        <Link href="#/env" className="mr-2">
          /env
        </Link>
        <Link href="#/my-context" className="mr-2">
          /my-context
        </Link>
        <Link href="#/mockapi" className="mr-2">
          /mockapi
        </Link>
        <Link
          href="#/search-params"
          value={{ id: 1, user: 'Sinuhe' }}
          className="mr-2"
        >
          /search-params
        </Link>
        <Link href="#/subpage/hello" className="mr-2">
          /subpage/hello
        </Link>
        <Link href="#/translate" className="mr-2">
          /translate
        </Link>
        <Link href="#/counter" className="mr-2">
          /counter
        </Link>
        <Link href="#/images" className="mr-2">
          /images
        </Link>
        <Link href="#/icons" className="mr-2">
          /icons
        </Link>
        <Link href="#/media-query" className="mr-2">
          /media-query
        </Link>
        <Link href="#/no" className="mr-2">
          /no
        </Link>
      </aside>

      <main ref={ref} className="m-2">
        {Page && <Page qs={qs.queryString} resize={resize} />}
      </main>
    </Context>
  )
}
