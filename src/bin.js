#!/usr/bin/env node

/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'

function createPage (name, isNext, isType) {
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

  if (existsSync(dirName)) {
    console.error(`Error: Can't create '${dirName}' page : File exists`)
  } else {
    mkdirSync(dirName, { recursive: true })

    const pageName = toPascalCase(name) + 'Page'

    // index.jsx
    writeFileSync(`${dirName}/${config.file[index]}`,
`${config.directive[index]}import React, { useEffect } from 'react'
import { useFx, css } from 'nextia'
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
    writeFileSync(`${dirName}/style.css`,
`.${pageName} {
}`)

    // function.js
    writeFileSync(`${dirName}/functions.js`,
`const initialState = {
}

export default { initialState }
`)
  }
}

function createComponent (name, isNext, isType) {
  const dirName = `./src/components/${name}`

  if (existsSync(dirName)) {
    console.error(`Error: Can't create '${dirName}' component : File exists`)
  } else {
    mkdirSync(dirName, { recursive: true })

    const componentName = name.replaceAll('/', '') + '-component'

    // index.jsx
    writeFileSync(`${dirName}/index.jsx`,
`import React, { useEffect } from 'react'
import './style.css'
import { css } from 'nextia'

export default function ${name} ({ className, style }) {
  return (
    <article className={css('${componentName}', className)} style={style}>
      ${componentName}
    </article>
  )
}
`)

    // style.css
    writeFileSync(`${dirName}/style.css`,
`.${componentName}  {
}`
    )
  }
}

function createContainer (name, isNext, isType) {
  const dirName = `./src/containers/${name}`

  if (existsSync(dirName)) { console.error(`Error: Can't create '${dirName}' container : File exists`) } else {
    mkdirSync(dirName, { recursive: true })

    const containerName = name.replaceAll('/', '') + '-container'

    // index.jsx
    writeFileSync(`${dirName}/index.jsx`,
`import React, { useEffect } from 'react'
import { useFx, css } from 'nextia'
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
    writeFileSync(`${dirName}/style.css`,
`.${containerName}  {
}`)

    // function.js
    writeFileSync(`${dirName}/functions.js`,
`const initialState = {
}

export default { initialState }
`)
  }
}

/**
 * main
 */

const CMD = process.argv[2]
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
    } else console.warn('npm run page <PageName>')
    break

  case 'component':
  case 'component:type':
    if (FILE_NAME) createComponent(FILE_NAME, null, CMD === 'component:type')
    else console.warn('npm run component <ComponentName>')
    break

  case 'container':
  case 'container:type':
    if (FILE_NAME) createContainer(FILE_NAME, null, CMD === 'component:type')
    else console.warn('npm run container <ContainerName>')
    break

  default:
    console.info('nextia')
    break
}
