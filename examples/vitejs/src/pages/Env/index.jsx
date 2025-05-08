import React, { useEffect } from 'react'
import { useFx, css } from 'nextia'
import functions from './functions'
import { env } from 'utils'
import './style.css'

export default function Env () {
  const { state, fx } = useFx(functions)

  // env
  useEffect(() => {
    console.log(env)
  }, [])

  return (
    <section className={css('Env', '')}>

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
