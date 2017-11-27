/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path')
const debug = require('debug')('app:config:project')
const argv = require('yargs').argv
const lib = require('./lib.dependencies')
// const ip = require('ip')

debug('Creating default configuration.')
// ========================================================
// Default Configuration
// ========================================================
const config = {
  env : process.env.NODE_ENV || 'development',
  analyze: process.env.ANALYZE_ENV || 'noanalyze',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_client : 'src',
  proxy_table : {},
  node_modules : 'node_modules',
  dir_dist   : 'output/resource/startkit',
  dir_template : 'output/template/startkit',
  dir_public : 'public',
  dir_common : 'common',
  dir_server : 'server',
  dir_test   : 'tests',
  postcss_sourcemap: false,
  open_browser: true,

  // ----------------------------------
  // Server Configuration
  // ip.address()
  // ----------------------------------
  server_host : '127.0.0.1',
  server_port : process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_babel : {
    cacheDirectory : true
  },
  compiler_devtool         : '#cheap-eval-source-map',
  compiler_timestamp       : '',
  compiler_hash_type       : 'hash:12',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '/resource/startkit/',
  compiler_common_path     : '/common/',
  compiler_mock_route      : '/mock',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendors : lib,

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
  'filename'     : 'index.html',
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__ANALYZE__'  : config.analyze === 'analyze',
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
  common : base.bind(null, config.dir_common),
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
