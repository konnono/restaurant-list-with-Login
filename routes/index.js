// load necessary packages
const express = require('express')
const router = express.Router()

// 引入home模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')

router.use('/', home)
router.use('/users', users)
router.use('/restaurants', restaurants)

// 匯出路由模組
module.exports = router