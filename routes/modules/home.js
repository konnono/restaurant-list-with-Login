// load necessary packages
const express = require('express')
const router = express.Router()

// 引用Restaurant model
const Restaurant = require('../../models/restaurant.js')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router