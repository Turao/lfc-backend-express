'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PoliticianSchema = new Schema({
  // belongs to
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },

  // belongs to
  party: { type: Schema.Types.ObjectId, ref: 'parties', required: true },

  // has many
  statements: [{ type: Schema.Types.ObjectId, ref: 'statements' }],
});

module.exports = mongoose.model('politicians', PoliticianSchema)