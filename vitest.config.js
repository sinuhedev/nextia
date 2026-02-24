import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const CWD = process.cwd()

export default defineConfig({
  root: `${CWD}/src`,
  resolve: {
    alias: {
      lib: `${CWD}/src/lib`
    }
  },

  plugins: [react()],

  test: {
    root: './',
    environment: 'jsdom',
    include: ['test/**/*.test.{js,jsx,ts,tsx}'],
    coverage: {
      reportsDirectory: '.coverage',
      include: ['src/**/*.{js,jsx,ts,tsx}']
    }
  }
})
