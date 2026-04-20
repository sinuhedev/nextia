import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  const CWD = process.cwd()

  return {
    server: {
      host: '0.0.0.0',
      port: 3000
    },

    root: `src`,
    envDir: CWD,
    envPrefix: 'PUBLIC_',
    publicDir: `${CWD}/public`,

    resolve: {
      alias: {
        assets: `${CWD}/src/assets`,
        components: `${CWD}/src/components`,
        services: `${CWD}/src/services`,
        utils: `${CWD}/src/utils`
      }
    },

    build: {
      outDir: '../out',
      emptyOutDir: true
    },

    plugins: [react()]
  }
})
