const mongoose = require('mongoose');

const redeemHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  redeemedAmount: { type: Number, required: true },
  redeemedHearts: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RedeemHistory', redeemHistorySchema);
