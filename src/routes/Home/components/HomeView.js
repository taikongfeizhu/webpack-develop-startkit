import React from 'react'
import PropTypes from 'prop-types'
import Card from 'components/Card'
import './HomeView.less'

class HomeView extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { location, params } = this.props
    console.log(location, params)
    return (
      <div className='gutter-example'>
        <Card title='Hello'>
          <h2>Tree New Bee</h2>
        </Card>
      </div>
    )
  }
}

HomeView.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object
}

export default HomeView
