// load necessary packages
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')


router.use('/users', users)
router.use('/restaurants', authenticator, restaurants)
router.use('/', authenticator, home)

// 匯出路由模組
module.exports = router