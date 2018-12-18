const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 1,
    maxlength: 64,
  },

  // belongs to
  party: { type: Schema.Types.ObjectId, ref: 'parties' },

  // // has many
  factChecks: [{ type: Schema.Types.ObjectId, ref: 'factChecks' }],

  // // has many
  moderated: [{ type: Schema.Types.ObjectId, ref: 'factChecks' }],

  // // has many
  statements: [{ type: Schema.Types.ObjectId, ref: 'statements' }],

});

module.exports = mongoose.model('users', UserSchema);
