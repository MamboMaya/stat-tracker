const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}
})

const trackerSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  activity: {type: String, required: true},
  unit: {type: String, required: true},
  log: [{
    date: {type: String},
    record: {type: Number}
  }]
})

module.exports = {
  Account: mongoose.model('Account', accountSchema),
  Tracker: mongoose.model('Tracker', trackerSchema)
}
