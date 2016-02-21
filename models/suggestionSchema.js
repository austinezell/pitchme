"use strict";

const Mongoose = require("mongoose");

const SuggestionSchema = new Mongoose.Schema({
  suggestor: {type: Mongoose.Schema.ObjectId, ref: "User"},
  title: {type: String, required: true},
  body: {type: String, required: true},
  datePosted: {type: Date, default: new Date}
});

SuggestionSchema.pre("save", function(next){
  this.body = this.body.replace(/<\w+>.*/g, function(code){
    if (/<code>.+<\/code>?/.test(code)) {
      code= code.substring(6, code.length-7);
    }
    code = `<code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`
    return code
  }).replace(/\n|↵/g, "<br>");
  next();
})

module.exports = Mongoose.model('Suggestion', SuggestionSchema)
