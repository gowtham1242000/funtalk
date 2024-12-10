const mongoose = require('mongoose');

const DiscoverySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },
    video: {
      type: String,
      required: false, // Optional field
    },
    title: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: false,
      default: true, // Status can be true (active) or false (inactive)
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Discovery', DiscoverySchema);
