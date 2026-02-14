import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig(() => {
  const exclude = ['node_modules', 'examples']

  return {
    plugins: [react()],

    test: {
      root: './',
      environment: 'jsdom',
      exclude,
      coverage: {
        reportsDirectory: '.coverage',
        include: ['src/**/*.{js,jsx}'],
        exclude
      }
    }
  }
})
