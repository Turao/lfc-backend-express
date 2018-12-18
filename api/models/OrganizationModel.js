const mongoose = require('mongoose');

const { Schema } = mongoose;
const OrganizationSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    minlength: 1,
    maxlength: 64,
  },

  // // has many
  events: [{ type: Schema.Types.ObjectId, ref: 'events' }],
});

module.exports = mongoose.model('organizations', OrganizationSchema);
