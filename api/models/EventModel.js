const mongoose = require('mongoose');

const { Schema } = mongoose;
const EventSchema = new Schema({
  name: {
    type: String,
    lowecase: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  // belongs to
  organization: { type: Schema.Types.ObjectId, ref: 'organizations', required: true },

  // has many
  moderators: [{ type: Schema.Types.ObjectId, ref: 'users', required: true }],

  // // has many
  // statements: [{ type: Schema.Types.ObjectId, ref: 'statements' }],
});

module.exports = mongoose.model('events', EventSchema);
