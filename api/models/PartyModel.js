'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartySchema = new Schema({
})

module.exports = mongoose.model('parties', PartySchema)