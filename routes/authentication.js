const router = require('express').Router();
const User = require('mongoose').model('User');
const jwt = require('jsonwebtoken');
const config = require('../config/properties');

router.route('/login')
  .post(doLogin)

router.route('/register')
  .post(doRegister);

module.exports = router;

async function doLogin(req, res, next) {
  let credentials = req.body;
  if(!credentials.email) {
    return res.status(400).json({message:'Require Email'});
  }
  if(!credentials.password) {
    return res.status(400).json({message:' Require Password'});
  }
  try {
    let u = await User.findOne({email:credentials.email});
    if(!u) {
      return res.status(404).json({message:'User Not Found!'});
    }
    let validPassword = u.validPassword(credentials.password);
    if(!validPassword) {
      return res.status(401).json({message:'Invalid Username / Password combination'});
    }
    let token  = jwt.sign({id:u._id}, config.secret);
    return res.status(200).json({message:'Welcome!', token: token});
  } catch(err) {
    next(err);
  }
}

async function doRegister(req, res, next) {
  let user = req.body;

  if (!user.email) {
    return res.status(400).json({ message: 'Require Email For User' });
  }
  if (!user.password) {
    return res.status(400).json({ message: 'Require Password For User' });
  }
  try {
    let result = await User.create(user);
    res.status(201).json({message:'Successfully Registered! Pleas Login'});
  } catch(err) {
    //You can handle this better.  I'm not going to though
    next(err);
  }

}