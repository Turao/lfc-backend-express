const mongoose = require('mongoose');

const { Schema } = mongoose;
const StatementSchema = new Schema({
  content: {
    type: String,
    lowercase: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  // belongs to
  politician: { type: Schema.Types.ObjectId, ref: 'politicians', required: true },

  // belongs to
  event: { type: Schema.Types.ObjectId, ref: 'events', required: true },

  // // has many
  // factChecks: [{ type: Schema.Types.ObjectId, ref: 'factChecks' }],
});

module.exports = mongoose.model('statements', StatementSchema);
