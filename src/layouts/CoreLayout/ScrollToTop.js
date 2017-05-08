import React from 'react'

class ScrollToTop extends React.Component {
  componentDidUpdate () {
    window.scrollTo(0, 0)
  }

  render () {
    return this.props.children
  }
}

ScrollToTop.propTypes = {
  children : React.PropTypes.object
}

export default ScrollToTop
