const mongoose = require('mongoose');

const reportReasonSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Keeps `reason` clean from extra spaces
  },
//  description: {
  //  type: String, // No `trim: true` here, as requested
 // },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

reportReasonSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ReportReason', reportReasonSchema);
