import React from 'react'
import PropTypes from 'prop-types'
import DataSearch from './DataSearch'
import LazyLoad from './LazyLoad'
import ThunkDemo from './ThunkDemo'

const Grid = (props) => {
  return (
    <div style={{ height:'100%', position:'relative' }}>{props.children}</div>
  )
}

Grid.propTypes = {
  children: PropTypes.object.isRequired
}

export default (store) => ({
  path: 'grid',
  component: Grid,
  indexRoute: {
    onEnter: (nextState, replace) => replace('/')
  },
  childRoutes: [
    DataSearch(store),
    LazyLoad(store),
    ThunkDemo(store)
  ]
})
