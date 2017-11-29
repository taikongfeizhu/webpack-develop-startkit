import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Radio, Select, Button, DatePicker } from 'antd'
import SearchModal from './SearchModal'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Search = Input.Search

const { RangePicker } = DatePicker

import './SearchForm.less'

class SearchForm extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      formValues: {},
      modalVisible: false
    }
  }

  handleModalVisible = (visible) => {
    this.setState({
      modalVisible: !!visible
    })
  }

  handleSearch = (params) => {
    this.handleModalVisible(false)
    this.props.handleFetchData(params)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.handleSearch()
  }

  handleModalCancel = () => {
    this.handleModalVisible(false)
  }

  handleMonthChange = (query) => {
    console.log(query)
  }

  handleFormReset = () => {
    const { form } = this.props
    form.resetFields()
  }

  render () {
    const { form:{ getFieldDecorator } } = this.props
    const { modalVisible } = this.state
    return (
      <div className={this.props.className}>
        <Form onSubmit={this.handleSubmit} layout='inline'>
          <Row gutter={8} className='divider border'>
            <Col span={5}>
              <FormItem label='规则编号'>
                {getFieldDecorator('no')(
                  <Select placeholder='请选择'>
                    <Select.Option value='0'>关闭</Select.Option>
                    <Select.Option value='1'>运行中</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={3}>
              <FormItem label=''>
                {getFieldDecorator('status')(
                  <Select placeholder='请选择'>
                    <Select.Option value='0'>关闭</Select.Option>
                    <Select.Option value='1'>运行中</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={7}>
              <FormItem label='首冲时间'>
                {getFieldDecorator('first_date')(
                  <RangePicker />
                )}
              </FormItem>
            </Col>
            <Col md={6}>
              <FormItem label='上线时间'>
                {getFieldDecorator('date')(
                  <DatePicker placeholder='选择日期' />
                )}
              </FormItem>
            </Col>
            <Col md={3}>
              <FormItem>
                <span style={{ float: 'right' }}>
                  <Button htmlType='submit' size='small'>查询</Button>
                  &nbsp;&nbsp;
                  <Button size='small' onClick={this.handleFormReset}>重置</Button>
                </span>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8} className='divider border-none'>
            <Col md={12}>{''}</Col>
            <Col md={12} className='search-box'>
              <FormItem label=''>
                <div>
                  <Search
                    size='default'
                    placeholder='客户ID/客户名称'
                    style={{ width: 225, marginRight: 5 }}
                    onSearch={value => console.log(value)}
                  />
                  <span className='submitButtons'>
                    <Button icon='edit'
                      type='primary'
                      onClick={() => this.handleModalVisible(true)}>申诉</Button>
                  </span>
                </div>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8} className='divider border'>
            <Col span={12}>
              <div className='status-button'>
                <Button className='launch'>已发起</Button>
                <Button className='approved'>申请通过</Button>
                <Button className='reject'>申请驳回</Button>
              </div>
            </Col>
            <Col span={12}>
              <div className='datepicker-box'>
                <FormItem>
                  <RadioGroup onChange={this.handleMonthChange} defaultValue='a' size='normal'>
                    <RadioButton value='a'>最近一个月</RadioButton>
                    <RadioButton value='b'>最近三个月</RadioButton>
                    <RadioButton value='c'>全部</RadioButton>
                  </RadioGroup>
                </FormItem>
              </div>
            </Col>
          </Row>
        </Form>
        <SearchModal
          modalVisible={modalVisible}
          onOk={this.handleSearch}
          onCancel={this.handleModalCancel}
        />
      </div>
    )
  }
}

SearchForm.propTypes = {
  form: PropTypes.object.isRequired,
  handleFetchData: PropTypes.func.isRequired,
  className: PropTypes.string
}

const WrappedForm = Form.create({

})(SearchForm)

export default WrappedForm
