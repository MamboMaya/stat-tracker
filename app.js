const express = require('express')
const app = express()
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Account = require('./models/schema.js').Account
const registerRoutes = require('./routes/register')
const activitiesRoutes = require('./routes/activities')
const statsRoutes = require('./routes/stats')

app.use(express.static('public'))
app.use(bodyParser.json())
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/stattracker')

passport.use(new BasicStrategy(
  function (username, password, done) {
    Account.findOne({
      username: username,
      password: password
    })
    .then(function (account) {
      if (account) {
        done(null, account)
      } else {
        done(null, false)
      }
    })
  }
))

app.use(registerRoutes)
app.use(passport.authenticate('basic', {session: false}))
app.use(activitiesRoutes)
app.use(statsRoutes)

app.listen(3000, function () {
  console.log('Server is ON! Go to 0.0.0.0:3000')
})
