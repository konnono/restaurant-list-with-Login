// load necessary packages
const express = require('express')
const router = express.Router()

// 引入home模組程式碼
const home = require('./modules/home')
// 將網址結構符合/的字串的request導向home模組
router.use('/', home)

// 引入restaurants模組程式碼
const restaurants = require('./modules/restaurants')
// 將網址結構符合/的字串的request導向home模組
router.use('/restaurants', restaurants)

// 匯出路由模組
module.exports = router