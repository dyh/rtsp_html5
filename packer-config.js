module.exports = {
  cwd: __dirname,
  global: {
    copy: {
        'node_modules/vue/dist': 'dist/contents/lib/vue',
      },
      browser: {
        outPath:'dist/contents/'
      },
      node: {
        outPath:'dist/'
      }
  },
  entries: {
    mainPage: {
      type: 'browser',
      title: '页面',
      input: 'contents/main-page/index.js',
    },
    server: {
      type: 'node',
      input: 'server/index.js',
      output: {
        fileName:'server'
      },
    },
  }
}
