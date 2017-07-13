const express = require('express')
const router = express.Router()
const Account = require('../models/schema.js').Account
const Tracker = require('../models/schema.js').Tracker
const bodyParser = require('body-parser')

// show information about one activity (and corresponding data) that the user is tracking
router.get('/api/activities/:id', function (req, res) {
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
router.put('/api/activities/:id', function (req, res) {
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
    .catch(function (error) {
      res.status(400).json({error: error})
    })
  })
  .catch(function (error) {
    res.status(422).json({error: error})
  })
})

// deletes one activity and the tracked data
router.delete('/api/activities/:id', function (req, res) {
  Tracker.deleteOne({
    _id: req.params.id
  })
  .then(function () {
    res.status(200).json({username: req.user.username})
  })
  .catch(function (error) {
    res.status(404).json({error: error})
  })
})

// add tracked data for a day
// TODO: Add functionality for overriding data from a day already input
router.post('/api/activities/:id/stats', function (req, res) {
  Tracker.findOne({
    _id: req.params.id
  })
  .then(function (tracker) {
    tracker.stats.push({
      date: req.body.date,
      record: req.body.record
    })
    tracker.save()
  })
  .then(function (tracker) {
    res.status(200).json({tracker: tracker})
  })
  .catch(function (error) {
    res.status(404).json({error: error})
  })
})

// remove the tracked data for a day
router.delete('/api/activities/:activityid/stats/:id', function (req, res) {
  Tracker.update(
    {_id: req.params.activityid},
    {$pull: {
      stats: {
        _id: req.params.id
      }
    }}
  )
  .then(function (tracker) {
    res.status(200).json({tracker: tracker})
  })
  .catch(function (error) {
    res.status(404).json({error: error})
  })
})

module.exports = router
