'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SourceSchema = new Schema({
  url: {
    type: String,
    lowercase: true,
  },

  // belongs to
  factCheck: { type: Schema.Types.ObjectId, ref: 'factChecks', required: true },
});

module.exports = mongoose.model('sources', SourceSchema)