const router = require('express').Router()
const User = require('mongoose').model('User')
const jwt = require('jsonwebtoken')
const config = require('../config/properties')

async function doLogin(req, res, next) {
  const credentials = req.body
  if (!credentials.email) {
    res.status(400).json({ message: 'Require Email' })
    return
  }
  if (!credentials.password) {
    res.status(400).json({ message: ' Require Password' })
    return
  }
  try {
    const u = await User.findOne({ email: credentials.email })
    if (!u) {
      res.status(404).json({ message: 'User Not Found!' })
      return
    }
    const validPassword = u.validPassword(credentials.password)
    if (!validPassword) {
      res
        .status(401)
        .json({ message: 'Invalid Username / Password combination' })
      return
    }
    const token = jwt.sign({ id: u._id }, config.secret)
    res.status(200).json({ message: 'Welcome!', token })
    return
  } catch (err) {
    next(err)
  }
}

async function doRegister(req, res, next) {
  const user = req.body

  if (!user.email) {
    res.status(400).json({ message: 'Require Email For User' })
    return
  }
  if (!user.password) {
    res.status(400).json({ message: 'Require Password For User' })
    return
  }
  try {
    await User.create(user)
    res.status(201).json({ message: 'Successfully Registered! Please Login' })
    return
  } catch (err) {
    // You can handle this better.  I'm not going to though
    next(err)
  }
}

router.route('/login').post(doLogin)

router.route('/register').post(doRegister)

module.exports = router
