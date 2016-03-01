"use strict";

const Mongoose = require("mongoose");

const SuggestionSchema = new Mongoose.Schema({
  suggestor: {type: Mongoose.Schema.ObjectId, ref: "User"},
  title: {type: String, default: "no title"},
  body: {type: String, required: true},
  datePosted: {type: Date, default: new Date}
});

SuggestionSchema.pre("save", function(next){
  this.body = this.body.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/`[^`]+`/g, function(code){
    return `<code>${code.substring(1, code.length-1)}</code>`;
  }).replace(/\n/g, "<br>");
  next();
})

module.exports = Mongoose.model('Suggestion', SuggestionSchema)
