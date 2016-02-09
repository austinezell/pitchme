"use strict";

const Mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(Mongoose);

const PitchSchema = new Mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  tags: [{type: String}],
  score: {type: Number, default: 0},
  pitcher: {type: Mongoose.Schema.ObjectId, ref: "User"},
  developers: [{type: Mongoose.Schema.ObjectId, ref: "User"}],
  administrators: [{type: Mongoose.Schema.ObjectId, ref: "User"}],
  completed: {type: Boolean, default: false},
  datePitched: {type: Date, default: new Date()},
  comments: [{type: Mongoose.Schema.ObjectId, ref: "Comment"}],
  requestedUsers: [{type: Mongoose.Schema.ObjectId, ref: "User"}],
  url: {type: String},
  issues: [{type: Mongoose.Schema.ObjectId, ref: "Issue"}],
  dateCompleted: {type: Date}
});

PitchSchema.plugin(deepPopulate, {
  whitelist: [
    "pitcher",
    "comments",
    "comments.commenter",
    "issues",
    "administrators",
    "issues.reporter",
    "issues.suggestions",
    "issues.suggestions.suggestor",
    "issues.suggestions.body"
  ]
})

module.exports = Mongoose.model('Pitch', PitchSchema)
