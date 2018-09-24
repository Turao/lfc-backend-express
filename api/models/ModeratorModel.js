'use strict'
const mongoose = require('mongoose');
const UserModel = require('./UserModel');

const Schema = mongoose.Schema;
const ModeratorSchema = new Schema({
  user: UserModel.schema,
})

module.exports = mongoose.model('moderators', ModeratorSchema)