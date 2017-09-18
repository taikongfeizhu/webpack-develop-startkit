import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import withBasename from 'until/withBasename'
import { Provider } from 'react-redux'

const baseName = ''

class AppContainer extends Component {

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

AppContainer.propTypes = {
  routes : PropTypes.object.isRequired,
  store  : PropTypes.object.isRequired
}

export default AppContainer
