const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const PrivacyPolicy = mongoose.model('PrivacyPolicy', privacyPolicySchema);

module.exports = PrivacyPolicy;
