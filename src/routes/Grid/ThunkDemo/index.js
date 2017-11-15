import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'thunk',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'System.import' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    Promise.all([
      import(/* webpackChunkName: "thunk_demo" */ './containers')
    ]).then(([Containers]) => {
      const modules = require('./modules')
      const reducer = modules.default
      injectReducer(store, { key: 'thunk_demo', reducer })
      /*  Return getComponent   */
      cb(null, Containers.default)
    })
  }
})
