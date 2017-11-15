export default (store) => ({
  path: 'base',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'System.import' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    Promise.all([
      import(/* webpackChunkName: "recharts" */ './containers')
    ]).then(([ChartsGallery]) => {
      /*  Return getComponent   */
      cb(null, ChartsGallery.default)
    })
  }
})
