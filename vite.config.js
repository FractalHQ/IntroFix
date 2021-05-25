const svelte = require('@sveltejs/vite-plugin-svelte')
const { appConfig } = require('./package.json')
const viteMainJs = require('vite-main-js')
const { port } = appConfig

const production = process.env.NODE_ENV === 'production'

module.exports = {
  server: {
    port: port,
  },
  build: {
    cssCodeSplit: false,
  },
  optimizeDeps: {
    exclude: ['@roxi/routify'],
  },
  resolve: {
    dedupe: ['@roxi/routify'],
  },
  plugins: [
    viteMainJs(), // routify helper for vite
    svelte({
      emitCss: true,
      hot: !production,
      extensions: ['.svelte'],
    }),
  ],
}
