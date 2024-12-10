const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The user who is reporting
  },
  reportedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The user being reported
  },
  reason: {
    type: String,
    required: true, // Reference to predefined report reasons
  },
  createdAt: {
    type: Date,
    default: Date.now, // When the report was created
  },
});

module.exports = mongoose.model('Report', reportSchema);
