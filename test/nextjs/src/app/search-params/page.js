'use client'

import React, { useEffect } from 'react'
import { useFx, css } from 'nextia'
import functions from './functions'
import { useSearchParams } from 'next/navigation'
import { Link } from 'components'
import './style.css'

export default function SearchParamsPage () {
  const { state, fx } = useFx(functions)
  const searchParams = useSearchParams()

  return (
    <section className={css('SearchParamsPage', '')}>
      <br />

      <Link href='/'>
        Go to href=/
      </Link>

      <br />

      <Link value={{ user: 'Maceda', demo: 200 }}>
        Link user=Maceda demo=200
      </Link>

      <br />

      <Link value={{ user: 'Sinuhe', demo: 10 }}>
        Link user=Sinuhe demo=10
      </Link>

      <br />
      <br />

      <pre style={{ margin: '0 50px 0 50px' }}>
        {JSON.stringify(Object.fromEntries(searchParams.entries()), undefined, 2)}
      </pre>

      <ul>
        <li>{'id: ' + searchParams.get('id')}</li>
        <li>{'user: ' + searchParams.get('user')}</li>
        <li>{'demo: ' + searchParams.get('demo')}</li>
      </ul>

    </section>
  )
}
