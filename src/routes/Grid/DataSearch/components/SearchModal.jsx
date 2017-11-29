import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input } from 'antd'

const FormItem = Form.Item

class SearchModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  handleOk = () => {
    const { form, onOk } = this.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const param = {
        archive_date: values.archive_date,
        archive_count: values.archive_count,
        archive_position: values.archive_position || ''
      }
      onOk && onOk(param)
    })
  }

  render () {
    const { modalVisible, form, onCancel } = this.props
    const { getFieldDecorator } = form
    return (
      <Form layout='horizontal'>
        <Modal
          title='新建申诉'
          visible={modalVisible}
          onOk={this.handleOk}
          onCancel={onCancel}
        >
          <Form>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label='描述'
            >
              {
                getFieldDecorator('archive_position', {})(
                  <Input placeholder='请输入' />
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </Form>
    )
  }
}

SearchModal.propTypes = {
  form: PropTypes.object.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

const WrappedForm = Form.create({

})(SearchModal)

export default WrappedForm
