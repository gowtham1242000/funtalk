const mongoose = require('mongoose');

const heartConversionRateSchema = new mongoose.Schema({
    ratePerHeart: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const HeartConversionRate = mongoose.model('HeartConversionRate', heartConversionRateSchema);

module.exports = HeartConversionRate;
