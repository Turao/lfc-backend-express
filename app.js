const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

// mongodb://<dbuser>:<dbpassword>@ds239047.mlab.com:39047/lfc-backend
// user: geromel
// pwd: gremio123
mongoose.connect('mongodb://geromel:gremio123@ds239047.mlab.com:39047/lfc-backend');


module.exports = app;
