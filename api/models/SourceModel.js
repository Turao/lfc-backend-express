'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SourceSchema = new Schema({
})

module.exports = mongoose.model('sources', SourceSchema)