/*const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  mobileNumber: { type: String, required: false},
  otp: {
    code: { type: Number, required: false },
    expiresAt: { type: Date, required: false }
  },
  googleId: { type: String, required: false },
  profile: {
    age: Number,
    gender: String,
    dateOfBirth: Date,
    language: String,
    place:{type: String, required:false},
    myMood: String,
    moodName: String,
    pointsEarned: { type: Number, default: 0 },
    walletBalance: { type: Number, default: 0 },
    heartBalance: { type: Number, default: 0 },
    coin: { type: Number, default: 0 },
    gifts: { type: Number, default: 0 },
    avatar: { type:String, required:false},
    image: {type:String, required:false},
    userDescription:{ type:String, required:false},
    email:{type:String, reuired:false},
  
  },
hosting: Boolean,
 newUser: { type: Boolean, default: true }
}, { timestamps: true });

// Method to generate OTP
userSchema.methods.generateOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP as a number
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
  this.otp = { code: otp, expiresAt };
  return otp;
};

// Method to verify OTP
userSchema.methods.verifyOTP = function(candidateOTP) {
  if (!this.otp || !this.otp.expiresAt || this.otp.expiresAt < Date.now()) {
    return false; // OTP expired or not set
  }
  return this.otp.code === parseInt(candidateOTP, 10); // Ensure candidateOTP is compared as a number
};

const User = mongoose.model('User', userSchema);

module.exports = User;

*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  mobileNumber: { type: String, required: false}, // unique and sparse
   status: {
    type: String,
    enum: ['approved', 'pending', 'declined'], // Limit possible values
    default: 'declined' // Default status when not specified
  },
   connectStatus: {
    type: String,
    enum: ['online', 'offline', 'incall'], // Limit possible values
    default: 'offline' // Default status when not specified
  },

  otp: {
    code: { type: Number, required: false },
    expiresAt: { type: Date, required: false }
  },
  googleId: { type: String, required: false },
  profile: {
    age: Number,
    gender: String,
    dateOfBirth: Date,
    language: String,
    place: { type: String, required: false },
    myMood: String,
    moodName: String,
    pointsEarned: { type: Number, default: 0 },
    walletBalance: { type: Number, default: 0 },
    heartBalance: { type: Number, default: 0 },
    fullheartBalance: { type: Number, default: 0 },
    coin: { type: Number, default: 0 },
    gifts: { type: Number, default: 0 },
    avatar: { type: String, required: false },
    image: { type: String, required: false },
    userDescription: { type: String, required: false },
    email: { type: String, required: false }, // corrected 'reuired' to 'required'
  },
  hosting: Boolean,
  
  newUser: { type: Boolean, default: true }
}, { timestamps: true });

// Method to generate OTP
userSchema.methods.generateOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP as a number
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
  this.otp = { code: otp, expiresAt };
  return otp;
};

// Method to verify OTP
userSchema.methods.verifyOTP = function(candidateOTP) {
  if (!this.otp || !this.otp.expiresAt || this.otp.expiresAt < Date.now()) {
    return false; // OTP expired or not set
  }
  return this.otp.code === parseInt(candidateOTP, 10); // Ensure candidateOTP is compared as a number
};

const User = mongoose.model('User', userSchema);

module.exports = User;

