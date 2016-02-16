"use strict";

const Mongoose = require("mongoose");

const SuggestionSchema = new Moongoose.Schema({
  suggestor: {type: Mongoose.Schema.ObjectId, ref: "User"},
  title: {type: String, required: true},
  body: {type: String, required: true},
  datePosted: {type: Date, default: new Date}
})
