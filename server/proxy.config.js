const proxy = [
  {
    url: '/back_end/page/*',
    target: 'http://127.0.0.1:3000/mock'
  },
  {
    url: '/opportunity/*',
    target: 'http://10.2.97.17:8331'
  },
  {
    url: '/sales/*',
    target: 'http://10.2.97.17:8331'
  },
  {
    url: '/call_center/*',
    target: 'http://10.2.97.17:8331'
  },
  {
    url: '/os/*',
    target: 'http://10.2.97.17:8331'
  }
]

module.exports = proxy
