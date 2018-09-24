'use strict'
const mongoose = require('mongoose');
const UserModel = require('./UserModel');

const Schema = mongoose.Schema;
const CheckerSchema = new Schema({
  user: UserModel.schema,
})

module.exports = mongoose.model('checkers', CheckerSchema)