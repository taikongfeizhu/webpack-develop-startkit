import React from 'react'
import PropTypes from 'prop-types'
import CustomCard from 'components/CustomCard'
import './HomeView.less'

class HomeView extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    // const { location, params } = this.props
    return (
      <div className='gutter-example'>
        <CustomCard title='首页'>
          <h2>Hello World</h2>
        </CustomCard>
      </div>
    )
  }
}

HomeView.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object
}

export default HomeView
