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
  },

  fullName: {
    type: String,
    required: true,
    lowercase: true,
  },
});

module.exports = mongoose.model('users', UserSchema);
