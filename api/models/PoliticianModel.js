'use strict'
const mongoose = require('mongoose');
const UserModel = require('./UserModel');

const Schema = mongoose.Schema;
const PoliticianSchema = new Schema({
  user: UserModel.schema,
})

module.exports = mongoose.model('politicians', PoliticianSchema)