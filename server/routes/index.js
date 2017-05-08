const express = require('express')
const router = express.Router()

router.get('/visualizer', function (req, res) {
  res.render('visualizer')
})

router.get('*', function (req, res) {
  res.render('mobile')
})

module.exports = router
