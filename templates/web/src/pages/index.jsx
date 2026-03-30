import i18nFile from 'assets/i18n'
import { Translate } from 'components'
import {
  I18n,
  Icon,
  Link,
  PagesFx,
  startViewTransition,
  useFx,
  useQueryString,
  useResize
} from 'nextia'
import { lazy, useEffect, useRef, useState } from 'react'
import iconsFile from 'theme/icons/icons.svg?raw'
import functions from './functions.js'

export default function Pages() {
  const pages = useFx(functions)
  const { state, fx } = pages

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

    startViewTransition(setPage(page), ref.current)
  }, [qs.hash])

  return (
    <PagesFx value={{ context: pages, icons: iconsFile, i18n: i18nFile }}>
      <header style={{ display: 'flex', gap: '20px' }}>
        <Icon id="globe" width="24" />

        <Translate />

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
        <Link href="#/view-transition" className="mr-2">
          /view-transition
        </Link>
        <Link href="#/images" className="mr-2">
          /images
        </Link>
        <Link href="#/icons" className="mr-2">
          /icons
        </Link>
        <Link href="#/resize" className="mr-2">
          /resize
        </Link>
        <Link href="#/dashboard" className="mr-2">
          /not-found
        </Link>
      </aside>

      <main ref={ref} className="m-2">
        {Page && <Page qs={qs.queryString} resize={resize} />}
      </main>
    </PagesFx>
  )
}
