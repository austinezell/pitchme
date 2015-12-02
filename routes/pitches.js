'use strict';

let router = require('express').Router();
const jwtAuth = require('../config/auth.js');
let Pitch = require('../models/pitchSchema.js');

router.get('/', (req, res) => {
  Pitch.find({}).populate('pitcher').exec( (err, pitches) => {
    err ? res.status(499).send(err) : res.send(pitches);
  })
})

router.post('/create', jwtAuth.middleware, (req, res) => {
  const userId = jwtAuth.getUserId(req.headers.authorization);
  req.body.pitcher = userId;

    if(/\W/.test(req.body.tags)){
      req.body.tags = req.body.tags.split(/\W/)
      let tempArr=[]
      req.body.tags.forEach(tag=>{
        if(tempArr.indexOf(tag) === -1 && tag){
          tempArr.push(tag)
        }
      })
      req.body.tags = tempArr;
    }



  Pitch.create(req.body, (err, pitch)=> {
    err ? res.status(499).send(err) : res.send(pitch);
  })
})


module.exports = router;
