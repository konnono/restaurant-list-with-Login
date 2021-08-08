// load necessary packages
const express = require('express')
const router = express.Router()

// 引用Restaurant model
const Restaurant = require('../../models/restaurant.js')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const userID = req.user._id
  console.log(userID)
  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userID
  })
    .then(() => res.redirect('./'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userID })
    .lean()
    .then(restaurant => {
      console.log(restaurant)
      res.render('show', { restaurant })
    })
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userID })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userID })
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userID })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router