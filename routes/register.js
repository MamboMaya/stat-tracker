const express = require('express')
const router = express.Router()
const Account = require('../models/schema.js').Account
const Tracker = require('../models/schema.js').Tracker
const bodyParser = require('body-parser')

// router.get('/', function (req, res) {
//   res.render('index')
// })

router.post('/', function (req, res) {
  const account = new Account()
  account.username = req.body.username
  account.password = req.body.password
  account.save()
  .then(function (account) {
    res.status(201).json({account: account})
  })
  .catch(function (error) {
    res.status(400).json({error: error})
  })
})

// router.post('/signin', function (req, res) {
//   Account.findOne({
//     username: req.body.username
//   })
//   .then(function (account) {
//     res.status(200).json({account: account})
//   })
//   .catch(function (error) {
//     res.status(404).json({error: error})
//   })
// })

module.exports = router
