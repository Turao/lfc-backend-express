const mongoose = require('mongoose');

const { Schema } = mongoose;
const PartySchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    minlength: 1,
    maxlength: 64,
  },

  abbreviation: {
    type: String,
    uppercase: true,
    unique: false, // is it possible for two parties to have the same abbreviation?
    minlength: 1,
    maxlength: 8,
  },

  // has many
  politicians: [{ type: Schema.Types.ObjectId, ref: 'users' }],
});

module.exports = mongoose.model('parties', PartySchema);
