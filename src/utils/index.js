import React from 'react'
import { COLUMNS, UNKNOW_COLUMN } from 'const'
import _ from 'lodash'
import { Select, Radio } from 'antd'

const Option = Select.Option
const _findItem = (list = [], value, key = 'name') => {
  return list.find((item, index) => {
    return '' + item[key] === '' + value
  })
}

let util = {
  buildColumns (list = [], opts = {}) {
    return list.map((item, index) => {
      let column = {}
      if (_.isString(item)) {
        column = { ...(COLUMNS[item] || UNKNOW_COLUMN) }
      } else {
        column = { ...(COLUMNS[item.key] || UNKNOW_COLUMN), ...item }
      }
      if (opts[column.key]) {
        column = Object.assign(column, opts[column.key])
      }
      return column
    })
  },
  buildOptions (list = [], opts = {}) {
    let { makeValue, makeLabel, valueField = 'id', labelField = 'name' } = opts
    return list.map((item, index) => {
      let key = item[valueField]
      let value = makeValue ? makeValue(item, index) : item[valueField]
      let label = makeLabel ? makeLabel(item, index) : item[labelField]
      return (
        <Option
          key={key || index}
          data-id={key}
          value={_.isNumber(value) ? ('' + value) : value}
        >
          {label}
        </Option>
      )
    })
  },
  buildRadios (list = [], opts = {}) {
    let { makeValue, makeLabel, valueField = 'id', labelField = 'name' } = opts
    return list.map((item, index) => {
      let key = item[valueField]
      let value = makeValue ? makeValue(item, index) : item[valueField]
      let label = makeLabel ? makeLabel(item, index) : item[labelField]
      return (
        <Radio
          key={key || index}
          data-id={key}
          value={_.isNumber(value) ? ('' + value) : value}
        >
          {label}
        </Radio>
      )
    })
  },
  formatSuccessData (source, init = []) {
    return source.success ? source.data : init
  },
  findItem (list = [], value, key = 'name') {
    if (_.isArray(value)) {
      return _.filter(list, (item) => {
        return value.find((v) => ('' + item[key] === '' + v))
      })
    }
    return _findItem(list, value, key)
  },
  selectFilter (key = 'value') {
    return (input, option) => (
      option.props[key].toLowerCase().indexOf(input.toLowerCase()) >= 0
    )
  },
  num2str (value) {
    return _.isArray(value) ? value.map(util.num2str) : (
      _.isUndefined(value) ? undefined : '' + value
    )
  },
  makeFileds (fieldsValue) {
    let result = {}
    _.forEach(fieldsValue, (value, key) => {
      result[key] = { value: value || undefined }
    })
    return result
  },
  formatList2Tree (list) {
    if (!list.length) return []
    _.forEach(list, (i) => {
      if (i.tripartite_types && i.tripartite_types.length > 0) {
        i.children = i.tripartite_types
        _.forEach(i.children, (o, index) => {
          o.id = '' + i.apply_id + 'index' + index
        })
      }
    })
    return list
  },
  formatMsg (msg) {
    return (
      <p dangerouslySetInnerHTML={{ __html: msg }} />
    )
  },
  processingDatainStockReview (subject, review) {
    let _data = subject.map(item => {
      item.data = []
      return item
    })
    review && review.data && review.data.forEach(item => {
      const getDataIndexByReviewData = () => {
        const _id = item.contract_subject_id
        for (let i = 0; i < _data.length; i++) {
          if (_data && _data[i].id === _id) return i
        }
        return -1
      }
      const _index = getDataIndexByReviewData()
      if (_index >= 0) {
        _data[_index].data.push(item)
      }
    })
    return _data
  },
  processingDatainBusinessReview (list) {
    return list && list.map(item => {
      return ({
        ...item,
        children: item.tripartite_types && item.tripartite_types.length > 1 && item.tripartite_types.map(i => {
          return ({
            'tripartite_type_name': i.tripartite_type_name,
            'contract_serials': i.contract_serials && i.contract_serials.map(o => {
              return {
                start: o.start,
                end: o.end
              }
            }),
            'applicant_name': item.applicant_name,
            'claim_num': i.claim_num,
            'status': item.status
          })
        }) || []
      })
    })
  },
  processingDatainBusinessCharts (stock, contractTypes) {
    const subjectLen = stock && stock.length || 0
    const typeLen = contractTypes && contractTypes.length || 0
    const result = []
    for (let i = 0; i < typeLen; i++) {
      const _t = []
      for (let j = 0; j < subjectLen; j++) {
        _t.push(0)
      }
      result.push(_t)
    }

    _.forEach(stock, (singleData, index) => {
      const subIndex = index
      _.forEach(singleData.tripartite_types, (d) => {
        const _v = d.stock
        const conIndex = _.findIndex(contractTypes, { id: d.tripartite_type })
        if (subIndex !== -1 && result[conIndex] !== undefined &&
          result[conIndex][subIndex] !== undefined) {
          result[conIndex][subIndex] += _v
        }
      })
    })
    return result
  }
}
export default util
