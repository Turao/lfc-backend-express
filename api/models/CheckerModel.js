'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CheckerSchema = new Schema({
  // belongs to
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },

  // has many
  factChecks: [{ type: Schema.Types.ObjectId, ref: 'factChecks' }]
});

module.exports = mongoose.model('checkers', CheckerSchema)