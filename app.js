// load necessary packages and server related setup
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Handlebars = require('handlebars');
const H = require('just-handlebars-helpers');
H.registerHelpers(Handlebars);

require('./config/mongoose')
const Restaurant = require('./models/restaurant.js')
const routes = require('./routes')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(routes)

// listen to server
app.listen(port, () => {
  console.log(`Express server is listening on localhost:${port}`)
})