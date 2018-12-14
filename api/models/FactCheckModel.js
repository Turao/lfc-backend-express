const mongoose = require('mongoose');

const { Schema } = mongoose;
const FactCheckSchema = new Schema({
  comment: {
    type: String,
    lowercase: true,
  },

  veracity: {
    type: String,
    enum: ['True', 'False', 'Partially True'],
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

  // has a
  source: { type: Schema.Types.ObjectId, ref: 'sources' },
});

module.exports = mongoose.model('factChecks', FactCheckSchema);
