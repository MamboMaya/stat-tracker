const express = require('express')
const router = express.Router()
const Account = require('../models/schema.js').Account
const Tracker = require('../models/schema.js').Tracker
const bodyParser = require('body-parser')

// show information about one activity (and corresponding data) that the user is tracking
router.get('/activities/:id', function (req, res) {
  Tracker.findOne({
    _id: req.params.id
  })
  .then(function (tracker) {
    res.status(200).json({
      username: req.user.username,
      tracker: tracker
    })
  })
  .catch(function (error) {
    res.status(422).json({error: error})
  })
})

// update activity that user is tracking
router.put('/activities/:id', function (req, res) {
  Tracker.findOne({
    _id: req.params.id
  })
  .then(function (tracker) {
    tracker.activity = req.body.activity
    tracker.unit = req.body.unit
    tracker.save()
    .then(function (tracker) {
      res.status(200).json({
        username: req.user.username,
        tracker: tracker
      })
    })
  })
  .catch(function (error) {
    res.status(422).json({error: error})
  })
})

// DELETE	/activities/{id}	Delete one activity I am tracking. This should remove tracked data for that activity as well.

// POST	/activities/{id}/stats	Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.

module.exports = router
