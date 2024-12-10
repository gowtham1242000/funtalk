const mongoose = require('mongoose');

const callCategorySchema = new mongoose.Schema({
  name: { type: String, required: false },
  description: { type: String, required: false },
  image: { type: String, required: false }, // URL or path of the uploaded image
 // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Admin
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('callCategory', callCategorySchema);
