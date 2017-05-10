import React from 'react'
import './Header.less'

export const Header = (props) => (
  <div>
    <div className='header'>
      {props.title}
    </div>
  </div>
)

Header.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default Header
