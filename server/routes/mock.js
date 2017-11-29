const express = require('express')
const router = express.Router()
const opporList = require('../data/opporList.json')
const Mock = require('mockjs')

router.get('/api/opporList', function (req, res) {
  res.json(opporList)
})

router.get('/api/opportunity_list', function (req, res) {
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'data|1-50': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      'create_day':'@date("yyyy-MM-dd")',
      'city': '@city(true)',
      'name': '@cname',
      'sales_name': '太厉害工程',
      'os_department_name': 'A组',
      'status_name': '跟进中',
      'address': '我要上天科技有限公司'
    }],
    code: 1,
    total: 50
  })
  res.json(data)
})

module.exports = router
