// models/UserOneVsOneList.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOneVsOneListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//  roomId: { type: String, required: true },
  isHost: { type: Boolean, required: true }, // true if user is hosting the room, false if connected
  category: { type: String, required: true }, // category of the room
  callType: { type: String, required: true }, // type of call: audio or video
  hostedCallType: {type: String, required: true},
  channelName: { type: String },
  token: { type:String },
  connectedAt: { type: Date, default: Date.now },
/*  status: { 
    type: String, 
    enum: ['approved', 'pending', 'declined'], // Limit possible values
    default: 'pending' // Default status when not specified
  },*/
});

module.exports = mongoose.model('UserOneVsOneList', userOneVsOneListSchema);
