const proxy = [
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
