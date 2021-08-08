// load necessary packages
const express = require('express')
const router = express.Router()

// 引用Restaurant model
const Restaurant = require('../../models/restaurant.js')

router.get('/', (req, res) => {
  const userID = req.user._id
  Restaurant.find({ userID })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const userID = req.user._id
  const sortBy = req.query.sortBy
  return Restaurant.find({ userID, "$or": [{ "name": { $regex: keyword, $options: 'i' } }, { "category": { $regex: keyword, $options: 'i' } }] })
    .lean()
    .sort(sortMethod(sortBy))
    .then((restaurants) => {
      if (restaurants.length === 0) {
        res.render('notfound', { keyword: keyword })
      } else {
        res.render('index', { restaurants, keyword, sortBy })
      }
    })
    .catch((error) => console.log(error))
})

// 匯出路由模組
module.exports = router

function sortMethod(sortBy) {
  switch (sortBy) {
    case '_id':
      return { _id: 'asc' }
    case 'rating_a':
      return { rating: 'asc' }
    case 'rating_d':
      return { rating: 'desc' }
    case 'location':
      return { location: 'asc' }
    case 'category':
      return { category: 'asc' }
  }
}