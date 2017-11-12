import React from 'react'
import { Link } from 'react-router'
import globalConfig from 'config.js'
import PropTypes from 'prop-types'
import './index.less'

/**
 * 定义Logo组件
 */
class Logo extends React.PureComponent {

  render () {
    return (
      <div className={this.props.collapsed ? 'ant-layout-logo-collapse' : 'ant-layout-logo-normal'}>
        <Link to={globalConfig.baseRoute} style={{ display: 'block' }}>
          <div className='ant-layout-logo-text'>
            {/* 侧边栏折叠的时候只显示一个字 */}
            {this.props.collapsed ? globalConfig.name[0] : globalConfig.name}
          </div>
        </Link>
      </div>
    )
  }
}

Logo.propTypes = {
  collapsed: PropTypes.bool.isRequired
}

export default Logo
