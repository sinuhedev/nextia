import { execSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { version } from './package.json'

export default defineConfig(({ mode }) => {
  const CWD = process.cwd()
  const host = '0.0.0.0'
  const port = 3000

  return {
    server: {
      host,
      port
    },

    preview: {
      host,
      port
    },

    base: '',
    envDir: CWD,
    envPrefix: 'PUBLIC_',
    root: `${CWD}/src`,
    publicDir: `${CWD}/public`,

    resolve: {
      alias: {
        assets: `${CWD}/src/assets`,
        components: `${CWD}/src/components`,
        services: `${CWD}/src/services`,
        theme: `${CWD}/src/theme`,
        utils: `${CWD}/src/utils`
      }
    },

    build: {
      outDir: '../out',
      assetsDir: 'assets',
      emptyOutDir: true
    },

    css: {
      postcss: {}
    },

    plugins: [
      react(),
      {
        name: 'html',
        transformIndexHtml(html) {
          let gitHash = ''
          try {
            gitHash = execSync('git rev-parse --short HEAD 2> /dev/null')
              .toString()
              .trim()
          } catch {}

          html.replaceAll(
            '%VERSION%',
            `version=${version}, env=${mode}, release-date=${new Date()}, git-hash=${gitHash}`
          )

          return html
        }
      },
      {
        name: 'svg',
        async transform(_src, id) {
          const [path, query] = id.split('?')
          if (query !== 'raw') return

          let code = await readFile(path, 'utf8')
          code = code
            .replace(/\s{2,}/g, ' ') // multiple spaces to single space
            .replace(/\n/g, '') // remove newlines
            .replace(/\t/g, '') // remove tabs
            .replace(/>\s+</g, '><') // remove space between tags
            .trim()
          return `export default ${JSON.stringify(code)};`
        }
      }
    ],

    test: {
      root: './',
      environment: 'jsdom',
      include: ['test/**/*.test.{js,jsx,ts,tsx}'],
      coverage: {
        reportsDirectory: '.coverage',
        exclude: ['src/assets', 'src/components/index.js', 'src/index.jsx'],
        include: ['src/**/*.{js,jsx,ts,tsx}']
      }
    }
  }
})
