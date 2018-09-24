'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatementSchema = new Schema({
})

module.exports = mongoose.model('statements', StatementSchema)