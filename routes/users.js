'use strict';

let router = require('express').Router();
const jwtAuth = require('../config/auth.js');

const Message = require('../models/messageSchema.js')
const User = require('../models/userSchema.js');


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

router.put('/update', jwtAuth, (req, res)=> {

  User.findByIdAndUpdate(req.payload._id, req.body, {new: true}, (err, user)=>{
    err ? res.status(499).send(err) : res.send(user)
  });
});

router.get('/me', jwtAuth, (req, res) => {
  User.findById(req.payload._id).populate("pitches").exec( (err, user)=>{
    if (err) return res.status(499).send(err)

    res.send(user);
  })
});

router.get('/me/archive', jwtAuth, (req, res) => {

  User.findById(req.payload._id).populate("messagesReceived").exec( (err, user)=>{
    user.messagesReceived = user.messagesReceived.filter(message => message.isRead)
    err ? res.status(499).send(err) : res.send(user);
  });
});

router.get('/one/:username', (req, res)=> {

  User.findOne({username: req.params.username}).populate('pitches').exec( (err, user)=>{
    err ? res.status(499).send(err) : res.send(user)
  })
})

router.post('/sendMessage', jwtAuth, (req, res) => {
  let messageObject = req.body.message;

  messageObject.sender =  req.payload._id;
  User.findById(messageObject.recipient, (err, recipient)=>{
    if (err) return res.status(499).send(err);
    Message.create(messageObject, (err, message)=>{
      if (err) return res.status(499).send(err);
      recipient.messagesReceived.push(message._id);
      recipient.save((err)=>{
        err ? res.status(499).send(err) : res.send('Message Sent!')
      })
      User.findById(userId, (err, sender)=>{
        sender.messagesSent.push(message._id)
        sender.save(()=>{
        })
      })
    })
  })

})


module.exports = router;
