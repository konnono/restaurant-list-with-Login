// load necessary packages and server related setup
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// load static files
app.use(express.static('public'))

// load restaurant json file
const restaurantList = require('./restaurant.json').results

// set routing paths
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

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