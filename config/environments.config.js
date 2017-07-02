// Here is where you can define configuration overrides based on the execution environment.
// Supply a key to the default export matching the NODE_ENV that you wish to target, and
// the base configuration will apply your overrides before exporting itself.

const withSourceMap = process.argv.slice(2).includes('sourcemap') > 0
const withTimestamp = process.argv.slice(2).includes('timestamp') > 0

const publishPath = {
  server: '/resource/os_mobile/',
  cdn: '//s3a.pstatp.com/cg_growth/resource/os_mobile/'
}

module.exports = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  // NOTE: In development, we use an explicit public path when the assets
  // are served webpack by to fix this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  development : (config) => ({
    compiler_public_path : `http://${config.server_host}:${config.server_port}/`
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // cdn public_path: //s3a.pstatp.com/cg_growth/resource/os_mobile/
  // ======================================================
  production : (config) => ({
    compiler_public_path     : publishPath.cdn,
    compiler_base_route      : '/apps/',
    compiler_fail_on_warning : false,
    compiler_hash_type       : 'chunkhash:12',
    compiler_timestamp       : withTimestamp ? `.${new Date().getTime()}` : '',
    compiler_devtool         : withSourceMap ? 'cheap-module-inline-source-map' : false,
    postcss_sourcemap        : false,
    open_browser             : false,
    compiler_stats           : {
      chunks       : true,
      chunkModules : true,
      colors       : true
    }
  })
}
