'use strict'

const Mongoose = require('mongoose');

const CommentSchema = new Mongoose.Schema({
  commenter: {type: Mongoose.Schema.ObjectId, ref: "User"},
  parentPitch: {type: Mongoose.Schema.ObjectId, ref: "Pitch"},
  body: {type: String, required: true}
})

module.exports = Mongoose.model('Comment', CommentSchema);
