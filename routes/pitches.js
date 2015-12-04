'use strict';

let router = require('express').Router();
const jwtAuth = require('../config/auth.js');
const Pitch = require('../models/pitchSchema.js');

router.get('/', (req, res) => {
  Pitch.find({}).populate('pitcher').exec( (err, pitches) => {
    err ? res.status(499).send(err) : res.send(pitches);
  })
});

router.get('/one/:id', (req, res)=> {
  Pitch.findById(req.params.id).populate('pitcher').exec( (err, pitch)=>{
    err ? res.status(499).send(err) : res.send(pitch);
  })
});

router.post('/create', jwtAuth.middleware, (req, res) => {
  const userId = jwtAuth.getUserId(req.headers.authorization);
  req.body.pitcher = userId;

    if(/\W/.test(req.body.tags)){
      req.body.tags = req.body.tags.split(/\W/)
      let tempArr = [];
      req.body.tags.forEach(tag=>{
        if(tempArr.indexOf(tag) === -1 && tag){
          tempArr.push(tag);
        }
      })
      req.body.tags = tempArr;
    }

  Pitch.create(req.body, (err, pitch)=> {
    err ? res.status(499).send(err) : res.send(pitch);
  })
});

router.post('/request', jwtAuth.middleware, (req, body) =>{
  const userId = jwtAuth.getUserId(req.headers.authorization);

});


module.exports = router;
