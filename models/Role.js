const mongoose = require('mongoose');

const AccessSchema = new mongoose.Schema({
  module: { type: String, required: true }, // E.g., "Banner", "Reports"
  permissions: {
    readOnly: { type: Boolean, default: false },
    readAndWrite: { type: Boolean, default: false },
  },
});

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // E.g., "Admin"
  access: [AccessSchema], // List of modules and their permissions
  status: { type: Boolean, default: true }, // Active or inactive
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Role', RoleSchema);
