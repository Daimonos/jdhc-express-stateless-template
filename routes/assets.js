const router = require('express').Router();
const Asset = require('mongoose').model('Asset');

const checkToken = require('../middleware/checkToken');
const authorize = require('../middleware/authorize');

router.route('/')
  .get(checkToken, authorize.hasAnyRole(['admin', 'manager']), getAssets)
  .post(checkToken, authorize.hasRole('admin'), createAsset);

router.route('/:id')
  .get(checkToken, authorize.hasAnyRole(['admin', 'manager']), getAsset)
  .put(checkToken, authorize.hasRole('admin'), updateAsset)
  .delete(checkToken, authorize.hasRole('admin'), deleteAsset);

module.exports = router;

async function getAssets(req, res, next) {
  try {
    let assets = await Asset.find();
    res.json(assets);
  } catch(err) {
    next(err);
  }
}

async function createAsset(req, res, next) {
  let asset = req.body;
  try {
    let a = await Asset.create(asset);
    res.status(201).json(a);
  } catch(err) {
    next(err);
  }
}

async function getAsset(req, res, next) {
  let id = req.params.id;
  try {
    let asset = await Asset.findById(id);
    res.json(asset);
  } catch(err) {
    next(err);
  }
}

async function updateAsset(req, res, next) {
  let id = req.params.id;
  let asset = req.body;
  try {
    let result = await Asset.update({_id:id}, asset, {new:true});
    res.json(result);
  } catch(err) {
    next(err);
  }
}

async function deleteAsset(req, res, next) {
  let id = req.params.id;
  try {
    let done = await Asset.deleteOne({_id:id});
    if(done) {
      return res.status(200).json({message:'Deleted'});
    }
  } catch(err) {
    next(err);
  }
}