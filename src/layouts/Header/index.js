import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Layout, Menu } from 'antd'
import { Link } from 'react-router'
import { headerMenu } from 'menu'
import Logo from '../Logo'

import './header.less'

const { Header } = Layout
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item
const MenuItemGroup = Menu.ItemGroup

class HeaderCustom extends PureComponent {
  state = {
    user: '',
    visible: false
  }

  componentWillMount () {
    const paths = []
    const { userName } = this.props.user
    const logoutMenuItem = <MenuItem key='logout'>
      <Icon type='logout' />
      <a href='/logout'>注销</a>
    </MenuItem>

    // header右侧用户菜单
    let userMenuItems = null

    const menu = headerMenu.map((level1) => {
      paths.push(level1.key)
      let transformedLevel1Menu

      if (level1.child) {
        const level2menu = level1.child.map((level2) => {
          paths.push(level2.key)

          if (level2.child) {
            const level3menu = level2.child.map((level3) => {
              paths.push(level3.key)
              const tmp = this.transFormMenuItem(level3, paths)
              paths.pop()
              return tmp
            })
            paths.pop()

            // 与sidebarMenu不同的是这里返回MenuItemGroup
            return (
              <MenuItemGroup key={level2.key}
                title={level2.icon ? <span><Icon type={level2.icon} />{` ${level2.name}`}</span>
                : <span>{level2.name}</span>}>
                <Menu.Divider />
                {level3menu}
              </MenuItemGroup>
            )
          } else {
            const tmp = this.transFormMenuItem(level2, paths)
            paths.pop()
            return tmp
          }
        })

        paths.pop()

        transformedLevel1Menu = (
          <SubMenu key={level1.key}
            title={level1.icon ? <span><Icon type={level1.icon} />{level1.name}</span> : level1.name}>
            {level2menu}
          </SubMenu>
        )
      } else {
        transformedLevel1Menu = this.transFormMenuItem(level1, paths)
        paths.pop()
      }

      // 顶层菜单parse完毕后, 先不要直接返回, 如果用户在config中定义了用户菜单, 要单独处理
      if (level1.key === 'userMenu') {
        userMenuItems = transformedLevel1Menu.props.children  // 注意这个直接读取props的逻辑
        return null
      } else {
        return transformedLevel1Menu
      }
    })

    this.menu = menu

    const userMenu = (
      <SubMenu title={<span><Icon type='user' />{userName}</span>}>
        {userMenuItems && userMenuItems[0] ? userMenuItems : null}
        <Menu.Divider />
        {logoutMenuItem}
      </SubMenu>
    )
    this.userMenu = userMenu
  }

  transFormMenuItem (obj, paths) {
    const parentPath = paths.join('/')
    return (
      <MenuItem key={obj.key}>
        {obj.icon && <Icon type={obj.icon} />}
        {obj.url ? <a target='_blank' href={obj.url}>{obj.name}</a>
        : <Link to={`/${parentPath}`}>{obj.name}</Link>}
      </MenuItem>
    )
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
        <Menu className='header-menu' mode='horizontal'>
          {this.userMenu}
          {this.menu}
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
