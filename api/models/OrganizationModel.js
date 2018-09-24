'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const OrganizationSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
  },
  
  // has many
  events: [{ type: Schema.Types.ObjectId, ref: 'events' }]
});

module.exports = mongoose.model('organizations', OrganizationSchema)