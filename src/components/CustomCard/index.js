/**
 * Created by huangjian on 2017/9/15.
 */
import React from 'react'
import { Card } from 'antd'
import PropTypes from 'prop-types'

const CardContainer = (props) => (
  <Card bordered={false} {...props}>
    {props.children}
  </Card>
)

CardContainer.propTypes = {
  children: PropTypes.any.isRequired
}

export default CardContainer
