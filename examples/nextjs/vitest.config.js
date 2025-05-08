import { loadEnvConfig } from '@next/env'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const CWD = process.cwd()

loadEnvConfig(CWD)

export default defineConfig({

  plugins: [react()],

  resolve: {
    alias: {
      assets: CWD + '/src/assets',
      components: CWD + '/src/components',
      containers: CWD + '/src/containers',
      services: CWD + '/src/services',
      utils: CWD + '/src/utils'
    }
  },

  test: {
    root: './',
    watch: false,
    environment: 'jsdom',
    include: ['test/**/*.js', 'test/**/*.jsx'],
    coverage: {
      all: true,
      reportsDirectory: '.coverage',
      include: ['src/**/*.js', 'src/**/*.jsx'],
      exclude: [
        'src/index.jsx'
      ]
    }
  }
})
