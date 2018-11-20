const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

let apiRoutes = require('./routes/api');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// dev only
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})



app.use('/api', apiRoutes);

const mongoose = require('mongoose');
// mongodb://<dbuser>:<dbpassword>@ds239047.mlab.com:39047/lfc-backend
// user: geromel
// pwd: gremio123
let db = mongoose.connect('mongodb://geromel:gremio123@ds239047.mlab.com:39047/lfc-backend');


module.exports = app;
