const express = require('express')
const router = express.Router()
const opporList = require('../data/opporList.json')
const Mock = require('mockjs')

router.get('/back_end/page/opporList', function (req, res) {
  res.json(opporList)
})

router.get('/back_end/page/employee', function (req, res) {
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      'name': 'name'
    }]
  })
  res.json(data)
})

module.exports = router
