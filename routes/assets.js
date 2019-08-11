const router = require('express').Router()
const Asset = require('mongoose').model('Asset')

const checkToken = require('../middleware/checkToken')
const authorize = require('../middleware/authorize')

async function getAssets(req, res, next) {
  try {
    const assets = await Asset.find()
    res.json(assets)
  } catch (err) {
    next(err)
  }
}

async function createAsset(req, res, next) {
  const asset = req.body
  try {
    const a = await Asset.create(asset)
    res.status(201).json(a)
  } catch (err) {
    next(err)
  }
}

async function getAsset(req, res, next) {
  const { id } = req.params
  try {
    const asset = await Asset.findById(id)
    res.json(asset)
  } catch (err) {
    next(err)
  }
}

async function updateAsset(req, res, next) {
  const { id } = req.params
  const asset = req.body
  try {
    const result = await Asset.update({ _id: id }, asset, { new: true })
    res.json(result)
  } catch (err) {
    next(err)
  }
}

async function deleteAsset(req, res, next) {
  const { id } = req.params
  try {
    const done = await Asset.deleteOne({ _id: id })
    if (done) {
      res.status(200).json({ message: 'Deleted' })
      return
    }
  } catch (err) {
    next(err)
  }
}

router
  .route('/')
  .get(checkToken, authorize.hasAnyRole(['admin', 'manager']), getAssets)
  .post(checkToken, authorize.hasRole('admin'), createAsset)

router
  .route('/:id')
  .get(checkToken, authorize.hasAnyRole(['admin', 'manager']), getAsset)
  .put(checkToken, authorize.hasRole('admin'), updateAsset)
  .delete(checkToken, authorize.hasRole('admin'), deleteAsset)

module.exports = router
