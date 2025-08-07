#!/usr/bin/env node

/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia/create-nextia
 */

import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { mkdir, writeFile, cp, rename, access } from 'node:fs/promises'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

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
import { css } from 'nextia'
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

async function createProject () {
  const rl = readline.createInterface({ input, output })
  const templates = ['', 'vitejs', 'nextjs']
  let projectName, project, template

  // inputs
  try {
    projectName = await rl.question('Project name: ')
    template = await rl.question('1) vitejs  \n2) nextjs \n: ')
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Unexpected error:', err)
    }
  } finally {
    rl.close()
  }

  // Is new project
  try {
    project = process.cwd() + `/${projectName}`
    await access(project)
    console.error(`The "${projectName}" already exists.`)
    return
  } catch (error) {
  }

  // templates
  const num = Number(template)
  if (!(Number.isInteger(num) && num >= 1 && num <= templates.length)) {
    console.error('The template does not exist.')
    return
  }
  template = dirname(fileURLToPath(import.meta.url)) + '/../templates/' + templates[template]

  // Create new project
  try {
    const mv = fileName => rename(project + `/_${fileName}`, project + `/.${fileName}`)

    await cp(template, project, { recursive: true })

    await mv('env.development')
    await mv('env.production')
    await mv('env.test')
    await mv('gitignore')
  } catch (err) {
    console.error(err)
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
    createProject()
    break
}
