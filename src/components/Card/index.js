/**
 * Created by huangjian on 2017/9/15.
 */
import React from 'react'
import { Card } from 'antd'
import PropTypes from 'prop-types'

const CardContainer = (props) => (
  <Card title={props.title} bordered={false}>
    {props.children}
  </Card>
)

CardContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export default CardContainer
