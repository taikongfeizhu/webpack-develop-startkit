import React from 'react'
import 'static/styles/core.less'
import './CoreLayout.less'
import ScrollToTop from './ScrollToTop'

export const CoreLayout = ({ children }) => (
  <div className='os-container notransition'>
    <ScrollToTop>
      <div>
        {children}
      </div>
    </ScrollToTop>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
