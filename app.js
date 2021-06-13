// load necessary packages and server related setup
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant.js')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-db', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// load static files
app.use(express.static('public'))

// set routing paths
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log('error occured'))
})

app.get('/restaurants/:id', (req, res) => {
  // const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  // res.render('show', { restaurant: restaurant })
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// app.get('/todos/:id', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render('detail', { todo }))
//     .catch(error => console.log(error))
// })

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  // look for keyword in name or category
  const restaurantSearched = restaurantList.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
  if (restaurantSearched.length === 0) {
    res.render('notfound', { keyword: keyword })
  } else {
    res.render('index', { restaurants: restaurantSearched, keyword: keyword })
  }
})

// listen to server
app.listen(port, () => {
  console.log(`Express server is listening on localhost:${port}`)
})