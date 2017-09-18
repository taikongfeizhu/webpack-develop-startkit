import React, { Component } from 'react'
import { Layout } from 'antd'
import PropTypes from 'prop-types'
import HeaderCustom from '../Header'
import SiderCustom from '../Sider'
import Breadcrumb from '../Breadcrumb'

import './CoreLayout.less'

const { Content, Footer } = Layout

class CoreLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render () {
    const { location:{ pathname }, children, router, routes } = this.props
    return (
      <Layout className='ant-layout-has-sider'>
        <SiderCustom path={pathname} collapsed={this.state.collapsed} toggle={this.toggle} />
        <Layout>
          <HeaderCustom toggle={this.toggle} user={{}} router={router}
            path={pathname} />
          <Content style={{ margin: '0 16px', overflow: 'initial' }}>
            <Breadcrumb routes={routes} />
            <div className='ant-layout-container'>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            React-Admin ©2017 Created
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
