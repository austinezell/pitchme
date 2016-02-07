"use strict";

const Mongoose = require('mongoose');

const IssueSchema = new Mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  reporter: {type: Mongoose.Schema.ObjectId, ref: "User"},
  isResolved: {type: Boolean, default: false},
  reportedOn: {type: Date, default: new Date},
  dateResolved: {type: Date},
  datePosted: {type: Date, default: new Date},
  suggestions: [{type: Mongoose.Schema.ObjectId, ref: "Suggestion"}]
});

module.exports = Mongoose.model("Issue", IssueSchema);
