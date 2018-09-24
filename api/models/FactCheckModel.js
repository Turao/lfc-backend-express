'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FactCheckSchema = new Schema({
})

module.exports = mongoose.model('factChecks', FactCheckSchema)