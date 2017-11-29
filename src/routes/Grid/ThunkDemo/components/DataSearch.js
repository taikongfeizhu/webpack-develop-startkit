/**
 * Created by huangjian on 2017/4/15.
 */
import React from 'react'
import PropTypes from 'prop-types'
import utils from 'utils'
import { Button, Form } from 'antd'
import CustomTable from 'components/CustomTable'
import CustomCard from 'components/CustomCard'
import _ from 'lodash'

const FormItem = Form.Item

const columns = [
  'id',
  'name',
  'address',
  'sales_name',
  'os_department_name',
  'status_name'
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
    const isFetching = _.get(thunk, 'isFetching', false)
    return (
      <CustomCard title='Thunk Demo'>
        <Form layout='inline'>
          <FormItem>
            <Button size='small' onClick={this.handleRequstOpporData}>刷新数据</Button>
          </FormItem>
        </Form>
        <CustomTable
          loading={isFetching}
          dataSource={opporList}
          columns={utils.buildColumns(columns)}
          scroll={{ x: 1200 }}
        />
      </CustomCard>
    )
  }
}

BasicTable.propTypes = {
  requestOpportunityData: PropTypes.func.isRequired,
  thunk: PropTypes.object.isRequired
}

export default BasicTable
