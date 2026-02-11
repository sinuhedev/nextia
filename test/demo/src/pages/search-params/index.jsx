import React, { useEffect } from 'react'
import { useFx, css } from 'nextia'
import { Link } from 'components'
import functions from './functions'
import './style.css'

export default function SearchParamsPage({ qs }) {
  const { state, fx } = useFx(functions)

  useEffect(() => {
    console.info(qs)
  }, [qs])

  return (
    <section className={css('SearchParamsPage', '')}>
      <br />

      <Link href="/">Go to href=/</Link>

      <br />

      <Link value={{ user: 'Maceda', demo: 200 }}>
        Link user=Maceda demo=200
      </Link>

      <br />

      <Link value={{ user: 'Sinuhe', demo: 10 }}>Link user=Sinuhe demo=10</Link>

      <br />
      <br />

      <pre style={{ margin: '0 50px 0 50px' }}>
        {JSON.stringify(qs, undefined, 2)}
      </pre>
    </section>
  )
}
