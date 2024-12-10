const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    coins: { type: Number, required: false },
    hearts:{ type: Number, required: false }, // Added coins field
    //balanceAfter: { type: Number, required: true },
    description: { type: String }, 
    createdAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
