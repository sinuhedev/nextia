import { env, useFx } from 'nextia'
import { useEffect } from 'react'
import functions from './functions'

export default function EnvPage() {
  const { state, fx } = useFx(functions)

  // env
  useEffect(() => {
    console.log('env:', env)
  }, [])

  return (
    <section>
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
