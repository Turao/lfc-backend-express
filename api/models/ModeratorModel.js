const mongoose = require('mongoose');

const { Schema } = mongoose;
const ModeratorSchema = new Schema({
  // belongs to
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },

  // belongs to
  event: { type: Schema.Types.ObjectId, ref: 'events', required: true },

  // // has many
  // factChecks: [{ type: Schema.Types.ObjectId, ref: 'factChecks' }],
});

module.exports = mongoose.model('moderators', ModeratorSchema);
