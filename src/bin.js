#!/usr/bin/env node

/**
 * Copyright (c) 2025 Sinuhe Maceda https://sinuhe.dev
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * https://github.com/sinuhedev/create-nextia
 */

import {
  access,
  cp,
  mkdir,
  readFile,
  rename,
  writeFile
} from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from '../package.json' with { type: 'json' }

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
import { useEffect } from 'react'
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

  try {
    await mkdir(dirName)
    const componentName = toPascalCase(name)

    // index.jsx
    writeFile(
      `${dirName}/index.jsx`,
      `import { css } from 'nextia'
import { useEffect } from 'react'
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

async function createContainer(name) {
  const dirName = `./src/components/${name}`

  try {
    await mkdir(dirName)
    const containerName = toPascalCase(name)

    // index.jsx
    writeFile(
      `${dirName}/index.jsx`,
      `import { useEffect } from 'react'
import { css, useFx } from 'nextia'
import functions from './functions'
import './style.css'

export default function ${containerName} ({ className, style }) {
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
    console.info(`✔ Container "${name}" created at ${dirName}`)
  } catch (err) {
    console.error(`Failed to create container: ${err.message}`)
  }
}

async function createProject(name) {
  const projectPath = `${process.cwd()}/${name}/`

  try {
    await access(projectPath)
    console.error(`The ${name} already exists`)
    return
  } catch {
    /* directory doesn't exist, proceed */
  }

  try {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const templatePath = `${__dirname}/../template`

    const replaceToken = async (filename, token, value) => {
      const content = await readFile(projectPath + filename, 'utf8')
      await writeFile(
        projectPath + filename,
        content.replaceAll(token, value),
        'utf8'
      )
    }

    await cp(templatePath, projectPath, { recursive: true })

    await Promise.all(
      ['env.dev', 'env.prod', 'env.test', 'gitignore'].map((fileName) =>
        rename(`${projectPath}_${fileName}`, `${projectPath}.${fileName}`)
      )
    )

    await replaceToken('README.md', 'TEMPLATE', name)
    await replaceToken('package.json', 'TEMPLATE', name)
    await replaceToken('package.json', 'file:../', pkg.version)

    console.info(`✔ Project "${name}" created successfully!`)
  } catch (err) {
    console.error(`Failed to create project: ${err.message}`)
  }
}

async function main() {
  const ARG1 = process.argv[2]
  const ARG2 = process.argv[3]

  switch (ARG1) {
    case 'page':
      if (ARG2) await createPage(ARG2)
      else console.warn('node --run nextia page <page-name>')
      break

    case 'component':
      if (ARG2) await createComponent(ARG2)
      else console.warn('node --run nextia component <ComponentName>')
      break

    case 'container':
      if (ARG2) await createContainer(ARG2)
      else console.warn('node --run nextia container <ContainerName>')
      break

    default:
      if (ARG1) await createProject(ARG1)
      else console.info(`v${pkg.version}\nnextia <ProjectName>`)
      break
  }
}

main().catch((e) => {
  console.error(e)
})
