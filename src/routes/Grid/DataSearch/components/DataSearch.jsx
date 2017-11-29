/**
 * Created by huangjian on 2017/11/15.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import CustomCard from 'components/CustomCard'
import StandardTable from 'components/StandardTable'
import SearchForm from './SearchForm'

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',')

const columns = [
  {
    title: '编号',
    dataIndex: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '城市',
    dataIndex: 'city'
  },
  {
    title: '销售名称',
    dataIndex: 'sales_name'
  },
  {
    title: '部门名称',
    dataIndex: 'os_department_name',
    sorter: true,
    align: 'right',
    render: val => `OS-${val}`
  },
  {
    title: '状态',
    dataIndex: 'status_name'
  },
  {
    title: '地址',
    dataIndex: 'address'
  },
  {
    title: '创建时间',
    dataIndex: 'create_day',
    sorter: true,
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
  },
  {
    title: '操作',
    render: () => (
      <div>
        <a href=''>调差</a>
      </div>
    )
  }
]

class BasicTable extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      addInputValue: '',
      expandForm: false,
      selectedRows: [],
      formValues: {}
    }
  }

  componentWillReceiveProps (nextProps) {
    // console.log(nextProps, '>>')
  }

  componentDidMount () {
    const { query } = this.props.location
    this.handleRequstOpporData(query)
  }

  updateQuery = (newQuery = {}) => {
    let { pathname } = this.props.location
    this.props.router.replace({
      pathname: pathname,
      query: newQuery
    })
  }

  handleRequstOpporData= (query) => {
    const { getOpportunityData } = this.props
    getOpportunityData({
      params: Object.assign({}, {
        current: 1,
        limit: 10
      }, query)
    })
    this.updateQuery(query)
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj }
      newObj[key] = getValue(filtersArg[key])
      return newObj
    }, {})

    const params = {
      current: pagination.current,
      limit: pagination.pageSize,
      ...formValues,
      ...filters
    }
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`
    }
    this.handleRequstOpporData(params)
  }

  render () {
    const curdData = this.props.curd.toJS()
    const { selectedRows } = this.state
    const list = _.get(curdData, 'list', [])
    const loading = _.get(curdData, 'loading')
    const pagination = _.get(curdData, 'pagination', {})
    const data = {
      list,
      pagination
    }
    return (
      <CustomCard title='业绩调差'>
        <div className='tableList'>
          <div className='tableListForm'>
            <SearchForm handleFetchData={this.handleRequstOpporData} />
          </div>
          <StandardTable
            rowSelect={false}
            showTips={false}
            columns={columns}
            selectedRows={selectedRows}
            loading={loading}
            data={data}
            onChange={this.handleTableChange}
          />
        </div>
      </CustomCard>
    )
  }
}

BasicTable.propTypes = {
  getOpportunityData: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  curd: PropTypes.object.isRequired
}

export default BasicTable
