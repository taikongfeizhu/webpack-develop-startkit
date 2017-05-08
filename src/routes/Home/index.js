import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'

export default (store) => ({

  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'System.import' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    Promise.all([
      import('./containers/HomeContainer'),
      import('./modules/')
    ]).then(([Home, modules]) => {
      const reducer = modules.default
      const sagas = modules.sagas

      injectReducer(store, { key: 'home', reducer })
      injectSagas(store, { key: 'home', sagas })

      /*  Return getComponent   */
      cb(null, Home.default)
    })
  }
})
