import React from 'react'
import { Link } from 'react-router'
import OsList from 'components/OsList'
import NotList from 'components/NotList'

import './CustomerList.less'
export const CustomerList = (props) => (
  <div className='customer-list os-card'>
    {!props.hideTitle &&
      <div className='customer-list-title'>
        <span>{props.customerType}客户：</span>
        <span className='customer-list-title-num'>{props.total}</span>
      </div>
    }
    {!!props.source.length && (<div className='customer-list-data'>
      {
        props.source.map((value, index) => {
          return <OsList status={props.status} key={index} data={value} />
        })
      }
      </div>)
    }
    {!props.source.length && <NotList title={props.customerType} />}
    {props.url && (props.source.length < props.total) &&
      <Link to={props.url} className='btn customer-list-btn'>
        查看全部{props.customerType}客户
      </Link>
    }
  </div>
)

CustomerList.propTypes = {
  hideTitle: React.PropTypes.bool,
  status: React.PropTypes.string,
  total: React.PropTypes.number.isRequired,
  url: React.PropTypes.string.isRequired,
  source: React.PropTypes.array.isRequired,
  customerType: React.PropTypes.string.isRequired
}

export default CustomerList
