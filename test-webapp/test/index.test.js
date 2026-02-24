import { env, sum } from 'utils'
import { test } from 'vitest'

test('sumTest', () => {
  console.info(sum(1, 20))
})

test('envTest', () => {
  console.info(`VITE_TITLE : ${env.VITE_TITLE}`)
})
