const router = require('express').Router()
const Asset = require('mongoose').model('Asset')
const checkToken = require('../middleware/checkToken')

async function getMe(req, res) {
  res.json(req.user)
}

async function getMyAssets(req, res, next) {
  try {
    const assets = await Asset.find({ assignedTo: req.user._id })
    res.json(assets)
  } catch (err) {
    next(err)
  }
}

router.route('/').get(checkToken, getMe)

router.route('/assets').get(checkToken, getMyAssets)

module.exports = router
