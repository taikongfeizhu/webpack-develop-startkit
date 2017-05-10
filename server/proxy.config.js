const proxy = [
  {
    url: '/bakckend/*',
    target: 'http://10.2.1.3:8000'
  }
]

module.exports = proxy
