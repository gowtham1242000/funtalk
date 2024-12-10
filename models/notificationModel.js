const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or path for the uploaded image
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sent: {
    type: Boolean,
    default: false, // To track if the notification has been sent
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
