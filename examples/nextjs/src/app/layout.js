'use client'

import { useEffect, useState } from 'react'
import { useFx, Context } from 'nextia'
import functions from './functions'
import { Icon, Icons, Menu } from 'components'
import { Translate, I18n } from 'containers'
import 'assets/theme/index.css'

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
                <Icon value='globe' />
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

              <Menu className='m-2' />

              <main className='m-2'>
                {children}
              </main>

            </Context>

            <Icons />

          </>}

      </body>
    </html>
  )
}

export default Layout
