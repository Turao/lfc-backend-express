'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PoliticianSchema = new Schema({
})

module.exports = mongoose.model('politicians', PoliticianSchema)