import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
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
    root: `${CWD}/src`,
    publicDir: `${CWD}/public`,
    resolve: {
      alias: {
        assets: `${CWD}/src/assets`,
        components: `${CWD}/src/components`,
        containers: `${CWD}/src/containers`,
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

    plugins: [react()]
  }
})
