import { css, useFx } from 'nextia'
import { useEffect } from 'react'
import { env } from 'utils'
import functions from './functions'
import './style.css'

export default function EnvPage() {
  const { state, fx } = useFx(functions)

  // env
  useEffect(() => {
    console.log(env)
  }, [])

  return (
    <section className={css('EnvPage', '')}>
      <br />
      <br />

      <div style={{ display: 'flex' }}>
        <pre style={{ margin: '0 50px 0 50px' }}>
          env = {JSON.stringify(env, undefined, 2)}
        </pre>
      </div>
    </section>
  )
}
