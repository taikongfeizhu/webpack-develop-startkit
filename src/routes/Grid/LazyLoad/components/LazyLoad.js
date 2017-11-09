/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react'
import { Card, Button } from 'antd'
import LazilyLoad, { importLazy } from 'until/LazilyLoad'

class LazyLoad extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loadModules: false
    }
    this.handleLoadHot = this.handleLoadHot.bind(this)
  }

  handleLoadHot () {
    if (!this.state.loadModules) {
      this.setState({
        loadModules: true
      })
    }
  }

  listContent = () => {
    return (
      <LazilyLoad
        modules={{
          List1: () => importLazy(import(/* webpackChunkName: "List-1" */ './hotList/List1')),
          List2: () => importLazy(import(/* webpackChunkName: "List-2" */ './hotList/List2'))
        }}
      >
        {({ List1, List2 }) => (
          <div>
            <List1 name='list1' />
            <List2 name='list2' />
          </div>
        )}
      </LazilyLoad>
    )
  }

  render () {
    const { loadModules } = this.state
    return (
      <Card title='模块懒加载' bordered={false}>
        <Button onClick={this.handleLoadHot}>load</Button>
        <div>
          {loadModules && this.listContent()}
        </div>
      </Card>
    )
  }
}

export default LazyLoad
