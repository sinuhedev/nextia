import { css, i18n } from 'lib'
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

test('i18nTest', () => {
  const i18nFile = {
    locales: ['EN', 'ES'],
    defaultLocale: 'ES',
    name: ['My name is {0} {1} {2}', 'Mi nombre es {0} {1} {2}']
  }

  console.log(
    i18n('name', ['Sinuhe', 'Maceda', 'Bouchan'], i18nFile, i18nFile.locales[0])
  )
})
