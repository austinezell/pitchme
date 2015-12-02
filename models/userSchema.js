'use strict'

let Mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');
let constants = require('../config/constants');


let UserSchema = new Mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  email: {type: String, required: true, unique: true},
  hash: {type: String, required: true},
  salt: {type: String, required: true},
  score: {type: Number, default: 0},
  isDeveloper: {type: Boolean, default: false},
  associates: [{type: Mongoose.Schema.ObjectId, ref: 'User'}],
  messagesSent: [{type: Mongoose.Schema.ObjectId, ref: 'Message'}],
  messagesReceived: [{type: Mongoose.Schema.ObjectId, ref: 'Message'}],
  pitchesWorkedOn: [{type: Mongoose.Schema.ObjectId, ref: 'Pitch'}],
  aboutMe: {type: String},
  dateJoined: {type: Date, default: new Date()}
})

UserSchema.methods.setPassword = function(password){
  if(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  }
};

UserSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const exp = new Date(today);

  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, (constants.SECRET));
};

module.exports = Mongoose.model('User', UserSchema)
