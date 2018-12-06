'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EventSchema = new Schema({
  name: {
    type: String,
    lowecase: true,
  },

  date: {
    type: Date,
    default: Date.now
  },

  // belongs to
  organization: { type: Schema.Types.ObjectId, ref: 'organizations', required: true },

  // // has many
  // moderators: [{ type: Schema.Types.ObjectId, ref: 'moderators' }],

  // // has many
  // statements: [{ type: Schema.Types.ObjectId, ref: 'statements' }],
});

module.exports = mongoose.model('events', EventSchema)