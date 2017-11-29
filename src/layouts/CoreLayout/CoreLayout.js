import React, { Component } from 'react'
import { Layout } from 'antd'
import PropTypes from 'prop-types'
import HeaderCustom from '../Header'
import SiderCustom from '../Sider'
import Breadcrumb from '../Breadcrumb'
import globalConfig from 'config'

import './CoreLayout.less'

const { Content, Footer } = Layout
const { baseConf:{ user } } = globalConfig

class CoreLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render () {
    const { location:{ pathname }, children, router, routes } = this.props
    const { collapsed } = this.state
    return (
      <Layout className='ant-layout-has-sider'>
        <SiderCustom path={pathname} collapsed={collapsed} toggle={this.toggle} />
        <HeaderCustom toggle={this.toggle} user={user} router={router}
          path={pathname} collapsed={collapsed} />
        <Layout>
          <Content className='custom-content'>
            <Breadcrumb routes={routes} />
            <div className='ant-layout-container'>
              {children}
            </div>
          </Content>
          <Footer className='footer'>
            {globalConfig.footer}
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

CoreLayout.propTypes = {
  location: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  router: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
}

export default CoreLayout
