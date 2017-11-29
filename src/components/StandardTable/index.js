import React, { PureComponent } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

import './index.less'

class StandardTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    totalCallNo: 0
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
        totalCallNo: 0
      })
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const totalCallNo = selectedRows.reduce((sum, val) => {
      return sum + parseFloat(val.callNo, 10)
    }, 0)

    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows)
    }

    this.setState({ selectedRowKeys, totalCallNo })
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter)
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], [])
  }

  render () {
    const { selectedRowKeys } = this.state
    const { data: { list, pagination }, loading, columns, rowSelect } = this.props

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination
    }

    const rowSelection = rowSelect ? {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled
      })
    } : null

    return (
      <div className='standardTable'>
        <Table
          loading={loading}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    )
  }
}

StandardTable.propTypes = {
  onSelectRow: PropTypes.func,
  selectedRows: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  rowSelect: PropTypes.bool.isRequired,
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
}

export default StandardTable
