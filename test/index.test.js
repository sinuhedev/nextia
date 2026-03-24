import { execSync } from 'node:child_process'
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

test('versionTest', () => {
  const out = execSync('node src/bin.js')
  console.info(out.toString())
})

test('appTest', () => {
  const out = execSync('rm -fr my-app && src/bin.js my-app')
  console.info(out.toString())
})

test('appExistTest', () => {
  const out = execSync('src/bin.js my-app')
  console.info(out.toString())
})

test('pageTest', () => {
  const out = execSync('cd my-app && ../src/bin.js page my-page')
  console.info(out.toString())
})

test('componentTest', () => {
  const out = execSync('cd my-app && ../src/bin.js component MyComponent')
  console.info(out.toString())
})

test('containerTest', () => {
  const out = execSync('cd my-app && ../src/bin.js container MyContainer')
  console.info(out.toString())
})
