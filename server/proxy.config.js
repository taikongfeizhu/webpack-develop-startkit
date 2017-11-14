const domain = 'http://127.0.0.1:3000'
const proxy = {
  '/api': {
    target: domain,
    changeOrigin: true,
    pathRewrite: {
      '^/api/' : '/mock/api/'
    }
  }
}

module.exports = proxy
