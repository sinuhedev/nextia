import { execSync } from 'node:child_process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { version } from './package.json'

export default defineConfig(({ mode }) => {
  const CWD = process.cwd()
  const port = 3000

  return {
    server: {
      host: '0.0.0.0',
      port
    },

    preview: {
      port
    },

    base: '',
    envDir: CWD,
    envPrefix: 'PUBLIC_',
    root: `${CWD}/src`,
    publicDir: `${CWD}/public`,

    resolve: {
      alias: Object.fromEntries(
        ['assets', 'components', 'services', 'theme', 'utils'].map((dir) => [
          dir,
          `${CWD}/src/${dir}`
        ])
      )
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

          return html.replaceAll(
            '%VERSION%',
            `version=${version}, env=${mode}, release-date=${new Date()}, git-hash=${gitHash}`
          )
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
