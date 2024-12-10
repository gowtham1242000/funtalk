const mongoose = require('mongoose');

const userFcmTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming userId is an ObjectId
        required: true,
        unique: true
    },
    fcmToken: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const UserFcmToken = mongoose.model('UserFcmToken', userFcmTokenSchema);

module.exports = UserFcmToken;
