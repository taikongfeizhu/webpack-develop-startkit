import { PropTypes, Component } from 'react'

class Provider extends Component {
  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render () {
    return this.props.children
  }
}

Provider.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
}
