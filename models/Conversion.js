const mongoose = require('mongoose');

const ConversionSchema = new mongoose.Schema({
  coinToDiamond: {
    coins: { type: Number, required: true },  // Number of coins
    diamond: { type: Number, required: true }  // Equivalent diamond
  },
  diamondToRupee: {
    diamond: { type: Number, required: true },  // Number of diamonds
    rupee: { type: Number, required: true }  // Equivalent rupees
  }
}, { timestamps: true });

module.exports = mongoose.model('Conversion', ConversionSchema);
