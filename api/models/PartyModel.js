'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PartySchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
  },

  abbreviation: {
    type: String,
    uppercase: true,
    unique: false, // is it possible for two parties to have the same abbreviation?    
  },
  
  // has many
  politicians: [{ type: Schema.Types.ObjectId, ref: 'politicians' }],
});

module.exports = mongoose.model('parties', PartySchema)