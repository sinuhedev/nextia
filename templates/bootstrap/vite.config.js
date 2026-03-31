import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(() => {
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

    plugins: [react()]
  }
})
