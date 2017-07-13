const express = require('express')
const router = express.Router()
const Account = require('../models/schema.js').Account
const Tracker = require('../models/schema.js').Tracker
const bodyParser = require('body-parser')

router.post('/register', function (req, res) {
  const account = new Account()
  account.username = req.body.username
  account.password = req.body.password
  account.save()
  .then(function (account) {
    res.status(201).json({account: account})
  })
  .catch(function (error) {
    res.status(400).json(error)
  })
})

module.exports = router
