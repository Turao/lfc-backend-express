const mongoose = require('mongoose');

const { Schema } = mongoose;
const FactCheckSchema = new Schema({
  comment: {
    type: String,
    lowercase: true,
    minlength: 10,
    maxlength: 256,
    required: true,
  },

  veracity: {
    type: String,
    enum: ['True', 'False', 'Partially True'],
    required: true,
  },

  source: {
    type: String,
    lowercase: true,
    minlength: 10,
    maxlength: 512,
    required: true,
  },

  verifiedByModerator: {
    type: Boolean,
  },

  // belongs to
  checker: { type: Schema.Types.ObjectId, ref: 'users', required: true },

  // belongs to
  statement: { type: Schema.Types.ObjectId, ref: 'statements', required: true },

  // belongs to
  moderator: { type: Schema.Types.ObjectId, ref: 'moderators' },
});

module.exports = mongoose.model('factChecks', FactCheckSchema);
