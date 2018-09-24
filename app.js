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

app.use('/api', apiRoutes);

const mongoose = require('mongoose');
// mongodb://<dbuser>:<dbpassword>@ds239047.mlab.com:39047/lfc-backend
// user: geromel
// pwd: gremio123
let db = mongoose.connect('mongodb://geromel:gremio123@ds239047.mlab.com:39047/lfc-backend');


module.exports = app;