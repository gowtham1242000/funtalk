const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
    },
    user: {
        type: Number,
        default: 0,
    },
    code: {
        type: String,
        required: true,
        unique: true, // Ensure the code is unique
    },
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
