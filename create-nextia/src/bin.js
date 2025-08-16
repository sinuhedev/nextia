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
import { mkdir, writeFile, readFile, cp, rename, access } from 'node:fs/promises'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

async function createPage (name, isNext) {
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

async function createComponent (name) {
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

async function createContainer (name) {
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
  let projectName, projectPath, templateId

  // inputs
  try {
    projectName = await rl.question('Project name: ')
    templateId = await rl.question('1) vitejs  \n2) nextjs \n: ')
    templateId = Number(templateId)
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Unexpected error:', err)
    }
  } finally {
    rl.close()
  }

  // Is new project
  try {
    projectPath = process.cwd() + `/${projectName}/`
    await access(projectPath)
    console.error(`The "${projectName}" already exists.`)
    return
  } catch (error) {
  }

  // templates
  if (!(Number.isInteger(templateId) && templateId >= 1 && templateId <= templates.length)) {
    console.error('The template does not exist.')
    return
  }

  const template = dirname(fileURLToPath(import.meta.url)) + '/../templates/' + templates[templateId]

  // Create new project
  try {
    const mv = fileName => rename(projectPath + `_${fileName}`, projectPath + `.${fileName}`)
    await cp(template, projectPath, { recursive: true })
    const replaceToken = async (filename, token, value) => {
      const content = await readFile(projectPath + filename, 'utf8')
      const updated = content.replaceAll(token, value)
      await writeFile(projectPath + filename, updated, 'utf8')
    }

    if (templateId === 1) {
      await mv('env.dev')
      await mv('env.prod')
    } else if (templateId === 2) {
      await mv('env.development')
      await mv('env.production')
    }
    await mv('env.test')
    await mv('gitignore')

    // replace tokens
    await replaceToken('README.md', 'TEMPLATE', projectName)
    await replaceToken('package.json', 'TEMPLATE', projectName)
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
    if (FILE_NAME) createPage(FILE_NAME, false)
    else console.warn('npm run page <page-name>')
    break

  case 'component':
    if (FILE_NAME) createComponent(FILE_NAME)
    else console.warn('npm run component <ComponentName>')
    break

  case 'container':
    if (FILE_NAME) createContainer(FILE_NAME)
    else console.warn('npm run container <ContainerName>')
    break

  case 'next:page':
    if (FILE_NAME) createPage(FILE_NAME, true)
    else console.warn('npm run next:page <page-name>')
    break

  default:
    createProject()
    break
}
