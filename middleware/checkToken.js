// middleware/authenticate.js
const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User')
const config = require('../config/properties')

module.exports = async function checkToken(req, res, next) {
  const token = req.headers['x-auth-token']
  if (!token) {
    res.status(403).json({ message: 'No Token Provided' })
    return
  }
  try {
    const payload = await jwt.verify(token, config.secret)
    const u = await User.findOne({ id: payload._id }, { password: false })
    req.user = u
    next()
  } catch (err) {
    res.status(403).json({ message: 'Invalid Token' })
  }
}
