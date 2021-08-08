const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

const restaurantList = require('./restaurant.json')

const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678',
    restaurants: restaurantList.slice(0, 3)
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    restaurants: restaurantList.slice(3, 6)
  }
]

db.once('open', () => {
  return Promise.all(SEED_USERS.map(async user => {
    const rtList = user.restaurants
    await User.create({
      email: user.email,
      password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    })
      .then(user => {
        return Promise.all(rtList.map(async restaurant => {
          await Restaurant.create({
            name: restaurant.name,
            name_en: restaurant.name_en,
            category: restaurant.category,
            image: restaurant.image,
            location: restaurant.location,
            phone: restaurant.phone,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            description: restaurant.description,
            userID: user._id
          })
        }))
      })
  }))
    .then(() => {
      console.log('done!')
      process.exit()
    })
})