import { useEffect } from 'react'
import { sum } from 'utils'
import useFunctions from './functions'

export default function HomePage() {
  const { state, initialState, fx, context } = useFunctions()

  useEffect(() => {
    console.info(sum(10, 10))
  }, [])

  return (
    <section className="flex">
      <button type="button" onClick={() => context.fx.toggle('loading')}>
        loading
      </button>
    </section>
  )
}
