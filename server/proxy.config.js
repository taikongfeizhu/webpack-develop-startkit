const domain = 'http://127.0.0.1:3000'
const proxy = [
  {
    url: '/opportunity/*',
    target: domain
  }
]

module.exports = proxy
