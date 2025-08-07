import { test } from 'vitest'
import { sum } from 'utils'

test('env', () => {
  console.info(process.env.NEXT_PUBLIC_TITLE)
})

test('hi2', () => {
  console.info('hddi')
})

test('sum', () => {
  console.info(sum(1, 20))
})
