import { test } from 'vitest'
import { env, sum } from 'utils'

test('hi', () => {
  console.info(sum(1, 20))
})

test('env', () => {
  console.info(env.VITE_TITLE)
})
