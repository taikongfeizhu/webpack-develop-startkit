/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path')
const debug = require('debug')('app:config:project')
const argv = require('yargs').argv
const ip = require('ip')

debug('Creating default configuration.')
// ========================================================
// Default Configuration
// ========================================================
const config = {
  env : process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_client : 'src',
  node_modules : 'node_modules',
  dir_dist   : 'output/resource/os_mobile',
  dir_template : 'output/template/os_mobile',
  dir_public : 'public',
  dir_server : 'server',
  dir_test   : 'tests',
  postcss_sourcemap: false,
  open_browser: true,

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : ip.address(), // 'http://127.0.0.1'
  server_port : process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_babel : {
    cacheDirectory : true,
    plugins        : ['transform-runtime'],
    presets        : [[ 'es2015', { modules: false } ], 'react', 'stage-0']
  },
  compiler_devtool         : 'source-map',
  compiler_timestamp       : '',
  compiler_hash_type       : 'hash:12',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '/resource/os_mobile',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendors : [
    'react',
    'react-dom',
    'react-router',
    'history',
    'redux',
    'react-redux',
    'immutable',
    'rc-form',
    'lodash',
    'isomorphic-fetch'
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters : [
    { type : 'text-summary' },
    { type : 'lcov', dir : 'coverage' }
  ]
}

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'filename'     : 'mobile.html',
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__COVERAGE__' : !argv.watch && config.env === 'test',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json')

config.compiler_vendors = config.compiler_vendors
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from \`compiler_vendors\` in ~/config/index.js`
    )
  })

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.paths = {
  base   : base,
  node_modules : base.bind(null, config.node_modules),
  client : base.bind(null, config.dir_client),
  public : base.bind(null, config.dir_public),
  dist   : base.bind(null, config.dir_dist),
  template : base.bind(null, config.dir_template)
}

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`)
const environments = require('./environments.config')
const overrides = environments[config.env]

if (overrides) {
  debug('Found overrides, applying to default configuration.')
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, defaults will be used.')
}

module.exports = config
