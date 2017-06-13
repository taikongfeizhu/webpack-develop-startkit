import React from 'react'
import { Link } from 'react-router'
import './OsList.less'

export const OsList = (props) => {
  return (
    <div className='customer-list-item'>
      <Link to={`/apps/oppor/detail/?id=${props.data.id}`}>
        <div className='os-list'>
          <div className='os-list-time'>
            {/* 如果是untrack状态的，appointment_time返回值为：暂无预约时间 */}
            <span>{props.data.appointment_time}
            </span>
            <span className='os-list-time-last'>{props.data.remain_time}</span>
          </div>
          <div className='os-list-target'>
            <span className='os-list-company'>{props.data.type + props.data.name}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

OsList.propTypes = {
  data: React.PropTypes.object.isRequired
}

export default OsList
