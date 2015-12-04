'use strict'

const Mongoose = require('mongoose');

const MessageSchema = new Mongoose.Schema({
  title: {type: String, default: 'No title'},
  body: {type: String, required: true},
  sender: {type: Mongoose.Schema.ObjectId, ref: "User"},
  recipient: {type: Mongoose.Schema.ObjectId, ref: "User"},
  isRead: {type: Boolean, default: false},
  dateSent: {type: Date, default: new Date()},
  dateRead: {type: Date}
})

module.exports = Mongoose.model('Message', MessageSchema)
