// react工程组件，用于提前编译
const dll = [
  'react',
  'react-dom',
  'react-router',
  'redux',
  'recharts',
  'redux-saga',
  'redux-thunk',
  'history',
  'react-redux',
  'immutable'
]

// 业务组件，通过babel配置支持tree-shaking
const vendors = [
  'moment',
  'lodash',
  'classnames',
  'isomorphic-fetch'
]

const lib = {
  dll: dll,
  vendors: vendors
}

module.exports = lib
