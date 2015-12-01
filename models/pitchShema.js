"use strict";

let Mongoose = require('mongoose')

let pitchSchema = new Mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  technologiesDesired: [{type: String}],
  score: {type: Number, default: 0},
  pitcher: {type: Mongoose.Schema.ObjectId, ref: "User"},
  developers: [{type: Mongoose.Schema.ObjectId, ref: "User"}],
  completed: {type: Boolean, default: false},
  datePitched: {type: Date, default: new Date()},
  dateCompleted: {type: Date}
});

module.exports = Mongoose.model('Pitch', PitchSchema)
