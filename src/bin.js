#!/usr/bin/env node

/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import { mkdir, writeFile } from 'node:fs/promises'

function toPascalCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, ' ') // replace special characters
    .split(/\s+/) // split by spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

async function createPage(name) {
  const dirName = `./src/pages/${name}`
  const pageName = `${toPascalCase(name)}Page`

  try {
    await mkdir(dirName)

    // index.jsx
    writeFile(
      `${dirName}/index.jsx`,
      `import { css, useFx } from 'nextia'
import functions from './functions'
import './style.css'

export default function ${pageName} () {
  const { state, fx } = useFx(functions)

  return (
    <section className={css('${pageName}', '')}>
      ${pageName}
    </section>
  )
}
`
    )

    // style.sss
    writeFile(
      `${dirName}/style.css`,
      `.${pageName} {
}
`
    )

    // function.js
    writeFile(
      `${dirName}/functions.js`,
      `const initialState = {}

export default { initialState }
`
    )
    console.info(`✔ Page "${pageName}" created at ${dirName}`)
  } catch (err) {
    console.error(`Failed to create page: ${err.message}`)
  }
}

async function createComponent(name) {
  const dirName = `./src/components/${name}`
  const componentName = toPascalCase(name)

  try {
    await mkdir(dirName)

    // index.jsx
    writeFile(
      `${dirName}/index.jsx`,
      `import { css } from 'nextia'
import './style.css'

export default function ${componentName} ({ className, style }) {
  return (
    <article className={css('${componentName}', className)} style={style}>
      ${componentName}
    </article>
  )
}
`
    )

    // style.css
    writeFile(
      `${dirName}/style.css`,
      `.${componentName}  {
}
`
    )
    console.info(`✔ Component "${name}" created at ${dirName}`)
  } catch (err) {
    console.error(`Failed to create component: ${err.message}`)
  }
}

async function createComponentFx(name) {
  const dirName = `./src/components/${name}`
  const componentFxName = toPascalCase(name)

  try {
    await mkdir(dirName)

    // index.jsx
    writeFile(
      `${dirName}/index.jsx`,
      `import { css, useFx } from 'nextia'
import functions from './functions'
import './style.css'

export default function ${componentFxName} ({ className, style }) {
  const { state, fx } = useFx(functions)

  return (
    <article className={css('${componentFxName}', className, '')} style={style}>
      ${componentFxName}
    </article>
  )
}
`
    )

    // style.css
    writeFile(
      `${dirName}/style.css`,
      `.${componentFxName}  {
}
`
    )

    // function.js
    writeFile(
      `${dirName}/functions.js`,
      `const initialState = {}

export default { initialState }
`
    )
    console.info(`✔ ComponentFx "${name}" created at ${dirName}`)
  } catch (err) {
    console.error(`Failed to create component:fx: ${err.message}`)
  }
}

async function main() {
  const ARG1 = process.argv[2]
  const ARG2 = process.argv[3]

  switch (ARG1) {
    case 'page':
      if (ARG2) await createPage(ARG2)
      else console.warn('node --run page -- <page-name>')
      break

    case 'component':
      if (ARG2) await createComponent(ARG2)
      else console.warn('node --run component -- <ComponentName>')
      break

    case 'component:fx':
      if (ARG2) await createComponentFx(ARG2)
      else console.warn('node --run component:fx -- <ComponentFxName>')
      break
  }
}

main().catch((e) => {
  console.error(e)
})
