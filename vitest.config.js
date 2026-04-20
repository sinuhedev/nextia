import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const CWD = process.cwd()

export default defineConfig({
  root: `src`,

  resolve: {
    alias: {
      nextia: `${CWD}/src/lib`
    }
  },

  plugins: [react()],

  test: {
    root: './',
    environment: 'jsdom',
    include: ['test/**/*.test.{js,jsx}'],
    coverage: {
      reportsDirectory: '.coverage',
      exclude: ['templates'],
      include: ['src/**/*.{js,jsx}']
    }
  }
})
