export default (store) => ({

  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'System.import' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    Promise.all([
      import(/* webpackChunkName: "home" */ './containers')
    ]).then(([Home]) => {
      /*  Return getComponent   */
      cb(null, Home.default)
    })
  }
})
