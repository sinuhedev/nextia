import { css } from 'nextia'
import { test } from 'vitest'

test('cssTest', () => {
  console.info(
    css(
      '   css-text   ',
      null,
      '',
      { '   my-css  ': true, 'bg-blue': false },
      ['no-css'],
      '  css-text    ',
      'css-text css2-text',
      2,
      '    ',
      '    my-class css-red   ',
      'bg-red'
    )
  )
})
