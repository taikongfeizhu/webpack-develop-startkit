import React from 'react'
import { Icon } from 'antd-mobile'
import { Link } from 'react-router'
import './OsList.less'

export const OsList = (props) => {
  return (
    <div className='customer-list-item'>
      <Link to={`/apps/oppor/detail/?id=${props.data.id}`}>
        <div className='os-list'>
          <div className='os-list-time'>
            <span>{props.status === 'untrack' ? '暂无跟进计划' : props.data.time}
            </span>
            <span className='os-list-time-last'>{props.data.remain_time}</span>
          </div>
          <div className='os-list-target'>
            <span className='os-list-company'>{props.data.type + props.data.name}</span>
            <span className='os-list-icon'>
              <Icon type='right' size='sm' />
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

OsList.propTypes = {
  status: React.PropTypes.string,
  data: React.PropTypes.object.isRequired
}

export default OsList
