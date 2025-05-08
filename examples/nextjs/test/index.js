import { test } from 'vitest'
import { sum } from 'utils'

test('env', () => {
  console.info(process.env.WEB_TITLE)
})

test('hi', () => {
  console.info('hddi')
})

test('sum', () => {
  console.info(sum(1, 20))
})
