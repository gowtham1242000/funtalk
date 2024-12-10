const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const liveStreamSchema = new Schema({
  hostUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Host user ID
  channelName: { type: String, required: true }, // Channel for the live stream
  isLive: { type: Boolean, default: true }, // Stream status (whether the stream is currently live)
  startTime: { type: Date, default: Date.now }, // Start time of the stream
  endTime: { type: Date }, // End time of the stream
  token: { type: String, required: true }, // Agora token or similar for live stream access
  appId: { type: String, required: true } // App ID for the streaming service (e.g., Agora)
}, { timestamps: true });

module.exports = mongoose.model('LiveStream', liveStreamSchema);
