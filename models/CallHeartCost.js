const mongoose = require('mongoose');

const callHeartCostSchema = new mongoose.Schema({
  audioCallHeartCost: {
    type: Number,
    required: true,
    default: 1  // Default value for audio call heart cost
  },
  videoCallHeartCost: {
    type: Number,
    required: true,
    default: 5  // Default value for video call heart cost
  },
  minute: {
    type: Number,
    required: true,
    default: 1  // Default value for the number of minutes
  }
});

const CallHeartCost = mongoose.model('CallHeartCost', callHeartCostSchema);

module.exports = CallHeartCost;
