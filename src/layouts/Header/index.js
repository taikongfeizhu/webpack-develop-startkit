import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Layout, Badge } from 'antd'
import Logo from '../Logo'
import avater from './asset/b1.jpg'

const { Header } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class HeaderCustom extends Component {
  state = {
    user: '',
    visible: false
  }

  componentDidMount () {

  }

  menuClick = e => {
    console.log(e)
    e.key === 'logout' && this.logout()
  }

  logout = () => {
    localStorage.removeItem('user')
    this.props.router.push('/login')
  }

  render () {
    return (
      <Header className='custom-header'>
        <Logo collapsed={this.props.collapsed} />
        <Icon
          className='trigger custom-trigger'
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
        <Menu
          mode='horizontal'
          style={{ float: 'right', paddingRight: 28 }}
          onClick={this.menuClick}
        >
          <Menu.Item key='1'>
            <Badge count={25} overflowCount={10}
              style={{ marginLeft: 10 }}>
              <Icon type='notification' />
            </Badge>
          </Menu.Item>
          <SubMenu title={<span className='avatar'>
            <img src={avater} alt='头像' />
            <i className='on bottom b-white' /></span>}>
            <MenuItemGroup title='用户中心'>
              <Menu.Item key='setting:1'>你好 - {this.props.user.userName}</Menu.Item>
              <Menu.Item key='setting:2'>个人信息</Menu.Item>
              <Menu.Item key='logout'><span onClick={this.logout}>退出登录</span></Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup title='设置中心'>
              <Menu.Item key='setting:3'>个人设置</Menu.Item>
              <Menu.Item key='setting:4'>系统设置</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </Header>
    )
  }
}

HeaderCustom.propTypes = {
  toggle: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
}

export default HeaderCustom
