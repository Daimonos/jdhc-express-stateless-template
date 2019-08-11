const mongoose = require('mongoose')

const env = process.env.NODE_ENV || 'development'
const db = require('../config/db')[env]

mongoose.connect(db)

require('./user.model')
require('./asset.model')
