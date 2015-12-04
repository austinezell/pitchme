'use strict'

const Mongoose = require('mongoose');

const CommentSchema = new Mongoose.Schema({
  sender: {type: Mongoose.Schema.ObjectId, ref: "User"},
  parentPitch: {type: Mongoose.Schema.ObjectId, ref: "Pitch"},
  body: {type: String}
})

module.exports = Mongoose.model('Comment', CommentSchema);
