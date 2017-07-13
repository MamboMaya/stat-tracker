const express = require('express')
const router = express.Router()
const Account = require('../models/schema.js').Account
const Tracker = require('../models/schema.js').Tracker
const bodyParser = require('body-parser')

// show list of all activities being tracked by user
router.get('/activities', function (req, res) {
  Account.findOne({
    _id: req.user._id
  })
  .then(function (account) {
    Tracker.find({
      userId: account._id
    })
    .then(function (tracker) {
      res.status(200).json({
        username: account.username,
        tracker: tracker
      })
    })
    .catch(function (error) {
      res.status(422).json({error: error})
    })
  })
  .catch(function (error) {
    res.status(422).json({error: error})
  })
})

// create a new activity to track
router.post('/activities', function (req, res) {
  const tracker = new Tracker()
  tracker.userId = req.user._id
  tracker.activity = req.body.activity
  tracker.unit = req.body.unit
  tracker.save()
  .then(function (tracker) {
    Account.findOne({
      _id: req.user._id
    })
    .then(function (account) {
      res.status(201).json({
        account: account,
        tracker: tracker
      })
    })
    .catch(function (error) {
      res.status(422).json({
        error: error,
        tracker: tracker
      })
    })
  })
  .catch(function (error) {
    res.status(422).json({
      error: error,
      tracker: tracker
    })
  })
})

module.exports = router
