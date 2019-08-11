const router = require('express').Router()
const checkToken = require('../middleware/checkToken')
const authorize = require('../middleware/authorize')

function getUsers() {
  throw new Error('Not Yet Implemented')
}

function getUser() {
  throw new Error('Not Yet Implemented')
}

router.route('/').get(checkToken, authorize.hasRole('admin'), getUsers)

router.route('/:id').get(checkToken, authorize.hasRole('admin'), getUser)

module.exports = router
