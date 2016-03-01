"use strict";

const Mongoose = require('mongoose');

const IssueSchema = new Mongoose.Schema({
  title: {type: String, default: "No Title"},
  description: {type: String, required: true},
  reporter: {type: Mongoose.Schema.ObjectId, ref: "User"},
  isResolved: {type: Boolean, default: false},
  dateResolved: {type: Date},
  datePosted: {type: Date, default: new Date},
  relevancy: {type: Number, default: 1},
  suggestions: [{type: Mongoose.Schema.ObjectId, ref: "Suggestion"}]
});

module.exports = Mongoose.model("Issue", IssueSchema);
