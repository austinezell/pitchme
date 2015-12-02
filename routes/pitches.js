'use strict';

let router = require('express').Router();
const jwtAuth = require('../config/auth.js');
let Pitch = require('../models/pitchSchema.js');

router.get('/', (req, res) => {
  Pitch.find({}, (err, pitches) => {
    err ? res.status(499).send(err) : res.send(pitches);
  })
})

router.post('/create', jwtAuth.middleware, (req, res) => {
  const userId = jwtAuth.getUserId(req.headers.authorization);

  req.body.pitcher = userId;

  Pitch.create(req.body, (err, pitch)=> {
    err ? res.status(499).send(err) : res.send(pitch);
  })
})


module.exports = router;
