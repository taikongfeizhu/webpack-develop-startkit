/**
 * Created by huangjian on 2017/11/15.
 */
import React from 'react'
import PropTypes from 'prop-types'
import utils from 'utils'
import { Button, Form } from 'antd'
import CustomTable from 'components/CustomTable'
import Card from 'components/Card'

const FormItem = Form.Item

const columns = [
  'id',
  'name',
  'sales_name',
  'city',
  'create_day',
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
    const { curd } = this.props
    return (
      <Card title='表格操作'>
        <Form layout='inline'>
          <FormItem>
            <Button size='small' onClick={this.handleRequstOpporData}>刷新数据</Button>
          </FormItem>
        </Form>
        <CustomTable
          dataSource={curd.opporList}
          columns={utils.buildColumns(columns)}
          scroll={{ x: 1200 }}
        />
      </Card>
    )
  }
}

BasicTable.propTypes = {
  requestOpportunityData: PropTypes.func.isRequired,
  curd: PropTypes.object.isRequired
}

export default BasicTable
