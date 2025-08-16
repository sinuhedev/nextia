import { test } from 'vitest'

test('env', () => {
  console.info(process.env.NEXT_PUBLIC_TITLE)
})
