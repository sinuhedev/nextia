'use client'

import { useEffect, useState } from 'react'
import { useFx, Context, logger } from 'fx1'
import functions from './functions'
import { Icon, Link } from 'components'
import { Translate, I18n } from 'containers'
import 'assets/theme/index.css'

logger(process.env.NEXT_PUBLIC_LOGGER)

function Layout ({ children }) {
  const self = useFx(functions)
  const { state, fx } = self

  // Window is not defined in Next.js React app
  const [start, setStart] = useState()

  useEffect(() => {
    setStart(true)
    self.fx.init()
  }, [])

  return (
    <html>
      <head>
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>
        <link rel='shortcut icon' href='logo.svg' />
        <meta
          name='version'
          content={`version=${process.env.VERSION}, env=${process.env.NODE_ENV}, release-date=${new Date()}, git-hash=${process.env.GIT_HASH}`}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' />
      </head>

      <body>
        {start &&
          <>
            <Context value={self}>

              <header className='m-2' style={{ display: 'flex', gap: '20px' }}>
                <Icon value='help' />
                <Translate value={state.i18nLocale} onChange={e => fx.changeI18n(e)} />

                <I18n value='page.name' args={['Sinuhe', 'Maceda', 'Bouchan']} />

                <button onClick={e => fx.increment(e)}>increment</button>
                {'  '}
                <button onClick={e => fx.decrement(e)}>decrement</button>
                {'  '}
                <button onClick={() => fx.zero({ value: 0 })}>zero</button>
                {'  '}
                {state.num}
                {'  '}
                {state.loading ? <span> Loading... </span> : <span> View.. </span>}
              </header>

              <aside className='m-2'>
                <Link href='/' className='mr-2'>
                  /
                </Link>
                <Link href='/home' className='mr-2'>
                  /home
                </Link>
                <Link href='/env' className='mr-2'>
                  /env
                </Link>
                <Link href='/my-context' className='mr-2'>
                  /my-context
                </Link>
                <Link href='/mockapi' className='mr-2'>
                  /mockapi
                </Link>
                <Link href='/search-params' value={{ id: 20, user: 'Sinuhe' }} className='mr-2'>
                  /search-params
                </Link>
                <Link href='/subpage/hello' className='mr-2'>
                  /subpage/hello
                </Link>
                <Link href='/translate' className='mr-2'>
                  /translate
                </Link>
                <Link href='/counter' className='mr-2'>
                  /counter
                </Link>
                <Link href='/images' className='mr-2'>
                  /images
                </Link>
                <Link href='/media-query' className='mr-2'>
                  /media-query
                </Link>
                <Link href='/no' className='mr-2'>
                  /no
                </Link>
              </aside>

              <main className='m-2'>
                {children}
              </main>

            </Context>
          </>}

      </body>
    </html>
  )
}

export default Layout
