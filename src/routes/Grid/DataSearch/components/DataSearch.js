/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react'
import PropTypes from 'prop-types'
import utils from 'utils'
import CustomTable from 'components/CustomTable'
import Card from 'components/Card'

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
  }

  componentDidMount () {
    const { requestOpportunityData } = this.props
    const pramas = {}
    requestOpportunityData(pramas)
  }

  render () {
    const { curd } = this.props
    return (
      <Card title='表格操作'>
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
