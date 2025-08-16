'use client'

import { useEffect, useState } from 'react'
import { useFx, Context, logger } from 'nextia'
import functions from './functions'
import { Icon, Link } from 'components'
import { Translate, I18n } from 'containers'
import 'theme/index.css'

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

                <Link href='/home' className='mr-2'>
                  home
                </Link>

                <Link href='/demo' className='mr-2'>
                  demo
                </Link>

              </header>

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
