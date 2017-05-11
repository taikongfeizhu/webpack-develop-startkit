import React from 'react'
import { WhiteSpace } from 'antd-mobile'
import moment from 'moment'
import AccountDashboard from './AccountDashboard/'
import CustomerList from 'components/CustomerList/'
import DataSearchList from './DataSearchList/'
import _ from 'lodash'
import { formatCustomerData } from 'until'
import Header from 'components/Header'

import './HomeView.less'

class HomeView extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { requestHomeData } = this.props
    const start = moment().startOf('month').format('YYYY-MM-DD')
    const end = moment().format('YYYY-MM-DD')
    const pramas = {
      dashboard: `start_date=${start}&end_date=${end}`,
      list: `page=1&limit=3`
    }
    requestHomeData(pramas)
  }

  render () {
    const home = this.props.home.toJS()
    const { num, amount, customerNum, untracks, trackings } = home.info
    const openAccount = _.get(num, 'num', 0)
    const toAccount = _.get(amount, 'num', 0)
    const trackingNum = _.get(customerNum, 'tracking_num', 0)
    const untrackedNum = _.get(customerNum, 'untracked_num', 0)
    const trackingList = formatCustomerData(_.get(trackings, 'data', []), 'track')
    const untrackedList = formatCustomerData(_.get(untracks, 'data', []))

    return (
      <div>
        <Header title={'工作台'} />
        <div className='os-dashboard os-content'>
          <AccountDashboard
            openAccount={openAccount}
            toAccount={toAccount}
          />
          <WhiteSpace size='lg' />
          <CustomerList
            status='tracking'
            hideTitle={false}
            total={trackingNum}
            source={trackingList}
            url={'/trackList/?status=tracking'}
            customerType={'跟进中'}
          />
          <WhiteSpace size='lg' />
          <CustomerList
            status='untrack'
            hideTitle={false}
            total={untrackedNum}
            source={untrackedList}
            url={'/trackList/?status=untrack'}
            customerType={'待跟进'}
          />
          <WhiteSpace size='lg' />
          <DataSearchList />
          <WhiteSpace size='lg' />
        </div>
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

