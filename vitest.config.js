import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
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
