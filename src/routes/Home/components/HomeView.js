import React from 'react'
import moment from 'moment'

import './HomeView.less'

class HomeView extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    // const { requestHomeData } = this.props
    const start = moment().startOf('month').format('YYYY-MM-DD')
    const end = moment().format('YYYY-MM-DD')
    const params = {
      dashboard: `start_date=${start}&end_date=${end}`,
      list: `page=1&limit=3`
    }
    console.log(params)
    // requestHomeData(pramas)
  }

  render () {
    return (
      <div className='home-tilte'>
        hello page
      </div>
    )
  }
}

HomeView.propTypes = {
  requestHomeData: React.PropTypes.func.isRequired,
  home: React.PropTypes.object.isRequired
}

HomeView.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default HomeView

