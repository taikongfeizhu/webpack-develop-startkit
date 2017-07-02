import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import withBasename from 'until/withBasename'
import { Provider } from 'react-redux'

const baseName = ''

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  componentDidMount () {
    document.querySelector('#root').style.display = 'block'
  }

  render () {
    const { routes, store } = this.props
    const history = syncHistoryWithStore(browserHistory, store)
    return (
      <Provider store={store}>
        <div>
          <Router history={withBasename(history, baseName)} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
