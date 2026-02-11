#!/usr/bin/env node

/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/nextia
 */

import pkg from '../package.json' with { type: 'json' }
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import {
  mkdir,
  writeFile,
  readFile,
  cp,
  rename,
  access
} from 'node:fs/promises'

async function createPage(name) {
  const toPascalCase = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, ' ') // replace special characters
      .split(/\s+/) // split by spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')

  const dirName = `./src/pages/${name}`

  try {
    await mkdir(dirName)

    const pageName = toPascalCase(name) + 'Page'

    // index.jsx
    writeFile(
      `${dirName}/index.jsx`,
      `import React, { useEffect } from 'react'
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
`
    )

    // style.sss
    writeFile(
      `${dirName}/style.css`,
      `.${pageName} {
}`
    )

    // function.js
    writeFile(
      `${dirName}/functions.js`,
      `const initialState = {
}

export default { initialState }
`
    )
  } catch (err) {
    console.error(err)
  }
}

async function createComponent(name) {
  const dirName = `./src/components/${name}`

  try {
    await mkdir(dirName)
    const componentName = name.replaceAll('/', '') + '-component'

    // index.jsx
    writeFile(
      `${dirName}/index.jsx`,
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
`
    )

    // style.css
    writeFile(
      `${dirName}/style.css`,
      `.${componentName}  {
}`
    )
  } catch (err) {
    console.error(err)
  }
}

async function createComponentFx(name) {
  const dirName = `./src/components/${name}`

  try {
    await mkdir(dirName)
    const containerName = name.replaceAll('/', '') + '-component'

    // index.jsx
    writeFile(
      `${dirName}/index.jsx`,
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
`
    )

    // style.css
    writeFile(
      `${dirName}/style.css`,
      `.${containerName}  {
}`
    )

    // function.js
    writeFile(
      `${dirName}/functions.js`,
      `const initialState = {
}

export default { initialState }
`
    )
  } catch (err) {
    console.error(err)
  }
}

async function createProject(name) {
  let projectPath

  try {
    projectPath = process.cwd() + `/${name}/`
    await access(projectPath)
    console.error(`The "${name}" already exists.`)
    return
  } catch (error) {}

  const template = dirname(fileURLToPath(import.meta.url)) + '/template/'

  // Create new project
  try {
    const mv = (fileName) =>
      rename(projectPath + `_${fileName}`, projectPath + `.${fileName}`)
    await cp(template, projectPath, { recursive: true })
    const replaceToken = async (filename, token, value) => {
      const content = await readFile(projectPath + filename, 'utf8')
      const updated = content.replaceAll(token, value)
      await writeFile(projectPath + filename, updated, 'utf8')
    }

    await mv('env.dev')
    await mv('env.prod')
    await mv('env.test')
    await mv('gitignore')

    // replace tokens
    await replaceToken('README.md', 'TEMPLATE', name)
    await replaceToken('package.json', 'TEMPLATE', name)
    await replaceToken('package.json', 'VERSION', pkg.version)
  } catch (err) {
    console.error(err)
  }
}

/**
 * main
 */

const ARG1 = process.argv[2]
const ARG2 = process.argv[3]

switch (ARG1) {
  case 'page':
    if (ARG2) createPage(ARG2)
    else console.warn('node --run page <page-name>')
    break

  case 'component':
    if (ARG2) createComponent(ARG2)
    else console.warn('node --run component <ComponentName>')
    break

  case 'container':
    if (ARG2) createComponentFx(ARG2)
    else console.warn('node --run container <ContainerName>')
    break

  default:
    if (ARG1) createProject(ARG1)
    else
      console.info(`
  Version ${pkg.version}
  
  npx nextia@latest <ProjectName>
    `)
    break
}
