import React from 'react'
import './NotList.less'
import PrinterImage from './assets/printer.png'

export const NotList = (props) => {
  return (
    <div className='customer-not-list'>
      <div>
        <img src={PrinterImage} />
      </div>
      <p>
        {`您还没有${props.title}，尽快添加吧`}
      </p>
    </div>
  )
}

NotList.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default NotList
