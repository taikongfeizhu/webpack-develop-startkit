import React from 'react'
import { Link } from 'react-router'
import './AccountDashboard.less'

export const AccountDashboard = (props) => (
  <div className='account-dashboard os-card'>
    <div className='account-left'>
      <Link to='/recharge/search?type=customer_num'>
        <p className='account-num'>{props.openAccount}</p>
        <p className='account-detail'>本月首充客户</p>
      </Link>
    </div>
    <div className='account-right'>
      <Link to='/recharge/search?type=amount'>
        <p className='account-num account-color-red'>{props.toAccount}</p>
        <p className='account-detail'>本月首充金额</p>
      </Link>
    </div>
  </div>
)

AccountDashboard.propTypes = {
  openAccount : React.PropTypes.number.isRequired,
  toAccount : React.PropTypes.number.isRequired
}

export default AccountDashboard
