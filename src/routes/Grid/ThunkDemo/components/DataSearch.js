/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react'
import PropTypes from 'prop-types'
import utils from 'utils'
import { Button, Form } from 'antd'
import CustomTable from 'components/CustomTable'
import Card from 'components/Card'
import _ from 'lodash'

const FormItem = Form.Item

const columns = [
  'id',
  'name',
  'sales_name',
  'os_department_name',
  'status_name',
  'address'
]

class BasicTable extends React.Component {
  constructor (props) {
    super(props)
    this.handleRequstOpporData = this.handleRequstOpporData.bind(this)
  }

  componentDidMount () {
    this.handleRequstOpporData()
  }

  handleRequstOpporData () {
    const { requestOpportunityData } = this.props
    requestOpportunityData()
  }

  render () {
    const { thunk } = this.props
    const opporList = _.get(thunk, 'opporList', [])
    return (
      <Card title='Thunk Demo'>
        <Form layout='inline'>
          <FormItem>
            <Button size='small' onClick={this.handleRequstOpporData}>刷新数据</Button>
          </FormItem>
        </Form>
        <CustomTable
          dataSource={opporList}
          columns={utils.buildColumns(columns)}
          scroll={{ x: 1200 }}
        />
      </Card>
    )
  }
}

BasicTable.propTypes = {
  requestOpportunityData: PropTypes.func.isRequired,
  thunk: PropTypes.object.isRequired
}

export default BasicTable
