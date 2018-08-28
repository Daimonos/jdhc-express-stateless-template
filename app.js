var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

//Load Mongoose Models
require('./models');
var routes = require('./routes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users', routes.users);
app.use('/api/v1/auth', routes.authentication);
app.use('/api/v1/me', routes.me);
app.use('/api/v1/assets', routes.assets);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  let message = {};
  message.error = req.app.get('env') === 'production' ? {} : err;
  message.status = err.status;
  message.message = err.message;
  res.status(500).json(message);
});


module.exports = app;
