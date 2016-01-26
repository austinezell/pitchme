"use strict";

const Mongoose = require("mongoose");

const SuggestionSchema = new Moongoose.Schema({
  suggestor: {type: Mongoose.Schema.ObjectId, ref: "User"},
  body: {type: String, required: true},
  petitionToResolve: {type: Boolean, default: false},
  datePosted: {type: Date, default: new Date()}
})
