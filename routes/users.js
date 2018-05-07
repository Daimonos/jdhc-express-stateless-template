const router = require('express').Router();
const checkToken = require('../middleware/checkToken');
const authorize = require('../middleware/authorize');

router.route('/')
  .get(checkToken, authorize.hasRole('admin'), getUsers);

router.route('/:id')
  .get(checkToken, authorize.hasRole('admin'), getUser);

module.exports = router;

function getUsers(req, res, next){
  throw new Error('Not Yet Implemented');
}

function getUser(req, res, next) {
  throw new Error('Not Yet Implemented');
}