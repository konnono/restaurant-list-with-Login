// load necessary packages
const express = require('express')
const router = express.Router()

// 引用Restaurant model
const Restaurant = require('../../models/restaurant.js')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  return Restaurant.create({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
  })
    .then(() => res.redirect('./'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
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
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  return Restaurant.find({ "$or": [{ "name": { $regex: keyword, $options: 'i' } }, { "category": { $regex: keyword, $options: 'i' } }] })
    .lean()
    .then((restaurants) => {
      if (restaurants.length === 0) {
        res.render('notfound', { keyword: keyword })
      } else {
        res.render('index', { restaurants, keyword: keyword })
      }
    })
    .catch((error) => console.log(error))
})

// 匯出路由模組
module.exports = router