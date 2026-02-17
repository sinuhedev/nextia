import { env, sum } from 'utils'
import { test } from 'vitest'

test('hi', () => {
  console.info(sum(1, 20))
})

test('env', () => {
  console.info(env.VITE_TITLE)
})
