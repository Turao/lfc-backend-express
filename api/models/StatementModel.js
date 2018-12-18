const mongoose = require('mongoose');

const { Schema } = mongoose;
const StatementSchema = new Schema({
  content: {
    type: String,
    lowercase: true,
    minlength: 1,
    maxlength: 256,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  source: {
    type: String,
    lowercase: true,
    minlength: 1,
    maxlength: 256,
  },

  // belongs to
  politician: { type: Schema.Types.ObjectId, ref: 'users', required: true },

  // belongs to
  event: { type: Schema.Types.ObjectId, ref: 'events', required: true },

  // // has many
  factChecks: [{ type: Schema.Types.ObjectId, ref: 'factChecks' }],
});

module.exports = mongoose.model('statements', StatementSchema);
