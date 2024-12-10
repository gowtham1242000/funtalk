const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  redeemedAmount: { type: Number, default: 0 }, // Total redeemed money
  withdrawnAmount: { type: Number, default: 0 }, // Total withdrawn money
}, { timestamps: true });

const WithdrawWallet = mongoose.model('WithdrawWallet', walletSchema);

module.exports = WithdrawWallet;
