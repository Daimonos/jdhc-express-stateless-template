// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const config = require('../config/properties');
const User = require('mongoose').model('User');

module.exports = async function(req, res, next) {
  let token = req.headers['x-auth-token'];
  if(!token) {
    return res.status(403).json({message:'No Token Provided'});
  }
  try{
    let payload = await jwt.verify(token, config.secret);
    let u = await User.findOne({id:payload._id}, {password:false});
    req.user = u;
    next();
  } catch(err) {
    res.status(403).json({message:'Invalid Token'});
  }
}