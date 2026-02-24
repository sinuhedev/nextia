import { css } from 'lib'
import { test } from 'vitest'

test('cssTest', () => {
  console.info(
    css('css-text', null, '', { 'my-css': true }, ['hola'], 'css-text', 2)
  )
})
