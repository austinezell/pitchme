'use strict';

let router = require('express').Router();
let jwtAuth = require('../config/auth.js');


let User = require('../models/userSchema.js');


router.post('/register', (req, res) =>{
  if(!req.body.username || !req.body.password){
    return res.status(401).send('Username and password are required fields');
  }

  let user = new User();
  user.username= req.body.username;
  user.email= req.body.email;
  user.setPassword(req.body.password);
  user.isDeveloper = req.body.isDeveloper;

  user.save( (err, data) => {
    if(err) return res.status(499).send(err)

    const jwt = data.generateJWT();
    res.send({jwt, user});
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(401).send('Please fill out all fields');
  }

  User.findOne({username: req.body.username}, function(err, user){
    if(err) return res.status(499).send(err)

    else if(!user || !user.validPassword(req.body.password)){
      return res.status(401).send('Invalid login credentials')
    }

    const jwt = user.generateJWT();
    res.send({jwt, user});
  });
});

router.put('/update', jwtAuth.middleware, (req, res)=> {
  const userId = jwtAuth.getUserId(req.headers.authorization);

  User.findByIdAndUpdate(userId, req.body, {new: true}, (err, user)=>{
    err ? res.status(499).send(err) : res.send(user)
  });
});

router.get('/me', jwtAuth.middleware, (req, res) => {
  const userId = jwtAuth.getUserId(req.headers.authorization);

  User.findById(userId).populate("messagesReceived pitches").exec( (err, user)=>{
    if (err) return res.status(499).send(err)
    user.messagesReceived = user.messagesReceived.filter(message => !message.isRead);

    res.send(user);
  })
});

router.get('/me/archive', jwtAuth.middleware, (req, res) => {
  const userId = jwtAuth.getUserId(req.headers.authorization);

  User.findById(userId).populate("messagesReceived").exec( (err, user)=>{
    user.messagesReceived = user.messagesReceived.filter(message => message.isRead)
    err ? res.status(499).send(err) : res.send(user);
  });
});


module.exports = router;
