#!/usr/bin/env node

/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/fx1
 */

import { mkdir, writeFile } from 'node:fs/promises'

async function createPage (name, isNext, isType) {
  const toPascalCase = str => str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, ' ') // replace special characters
    .split(/\s+/) // split by spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

  const index = isNext ? 1 : 0
  const config = {
    root: ['pages', 'app'],
    file: ['index.jsx', 'page.jsx'],
    directive: [
      '',
      `'use client'

`]
  }

  const dirName = `./src/${config.root[index]}/${name}`

  try {
    await mkdir(dirName)

    const pageName = toPascalCase(name) + 'Page'

    // index.jsx
    writeFile(`${dirName}/${config.file[index]}`,
  `${config.directive[index]}import React, { useEffect } from 'react'
import { useFx, css } from 'fx1'
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
`)

    // style.sss
    writeFile(`${dirName}/style.css`,
  `.${pageName} {
}`)

    // function.js
    writeFile(`${dirName}/functions.js`,
  `const initialState = {
}

export default { initialState }
`)
  } catch (err) {
    console.error(err)
  }
}

async function createComponent (name, isType) {
  const dirName = `./src/components/${name}`

  try {
    await mkdir(dirName)
    const componentName = name.replaceAll('/', '') + '-component'

    // index.jsx
    writeFile(`${dirName}/index.jsx`,
`import React, { useEffect } from 'react'
import { css } from 'fx1'
import './style.css'

export default function ${name} ({ className, style }) {
  return (
    <article className={css('${componentName}', className)} style={style}>
      ${componentName}
    </article>
  )
}
`)

    // style.css
    writeFile(`${dirName}/style.css`,
`.${componentName}  {
}`
    )
  } catch (err) {
    console.error(err)
  }
}

async function createContainer (name, isType) {
  const dirName = `./src/containers/${name}`

  try {
    await mkdir(dirName)
    const containerName = name.replaceAll('/', '') + '-container'

    // index.jsx
    writeFile(`${dirName}/index.jsx`,
`import React, { useEffect } from 'react'
import { useFx, css } from 'fx1'
import functions from './functions'
import './style.css'

export default function ${name} ({ className, style }) {
  const { state, fx } = useFx(functions)

  return (
    <article className={css('${containerName}', className, '')} style={style}>
      ${containerName}
    </article>
  )
}
`)

    // style.css
    writeFile(`${dirName}/style.css`,
`.${containerName}  {
}`)

    // function.js
    writeFile(`${dirName}/functions.js`,
`const initialState = {
}

export default { initialState }
`)
  } catch (err) {
    console.error(err)
  }
}

/**
 * main
 */

const CMD = process.argv[2]
const PROJECT_NAME = process.argv[2]
const FILE_NAME = process.argv[3]

switch (CMD) {
  case 'page':
  case 'page:type':
  case 'next:page':
  case 'next:page:type':
    if (FILE_NAME) {
      createPage(
        FILE_NAME,
        ['next:page', 'next:page:type'].includes(CMD),
        ['page:type', 'next:page:type'].includes(CMD))
    } else console.warn('npm run page <page-name>')
    break

  case 'component':
  case 'component:type':
    if (FILE_NAME) createComponent(FILE_NAME, CMD === 'component:type')
    else console.warn('npm run component <ComponentName>')
    break

  case 'container':
  case 'container:type':
    if (FILE_NAME) createContainer(FILE_NAME, CMD === 'component:type')
    else console.warn('npm run container <ContainerName>')
    break

  default:
    // create project
    if (PROJECT_NAME) console.info(`Project name: ${PROJECT_NAME}`)
    else console.warn('npx fx1@latest <my-app>')
    break
}
