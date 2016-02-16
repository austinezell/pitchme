'use strict';

let router = require('express').Router();
const jwtAuth = require('../config/auth.js');
const Pitch = require('../models/pitchSchema.js');
const Message = require('../models/messageSchema.js');
const Issue = require('../models/issueSchema.js');
const User = require('../models/userSchema.js');
const Comment = require('../models/commentSchema.js');

router.get('/', (req, res) => {
  Pitch.find({}, (err, pitches) => {
    err ? res.status(499).send(err) : res.send(pitches);
  })
});

router.get('/details/:id', (req, res)=>{
  Pitch.findById(req.params.id).deepPopulate(['pitcher', 'issues', 'issues.reporter', 'developers', 'administrators', 'url'])
  .exec( (err, pitch)=>{
    err ? res.status(499).send(err) : res.send(pitch);
  })
})

router.get('/one/:id', (req, res)=> {
  Pitch.findById(req.params.id).deepPopulate(['pitcher', "comments", "comments.commenter"]).exec( (err, pitch)=>{
    err ? res.status(499).send(err) : res.send(pitch);
  })
});


router.post('/addIssue/:id', jwtAuth.middleware, (req, res) =>{
  const userId = jwtAuth.getUserId(req.headers.authorization);
  req.body.reporter = userId;

  Issue.create(req.body, (err, issue)=>{
    if (err) return res.status(499).send(err);

    Pitch.findById(req.params.id, (err, pitch)=>{
      if (err) return res.status(499).send(err);

      pitch.issues.push(issue._id)
      pitch.save( (err)=>{
        if (err) return res.status(499).send(err);

        err ? res.status(499).send(err) : res.send({pitch, issue});
      })
    })
  })
})

router.post('/create', jwtAuth.middleware, (req, res) => {
  const userId = jwtAuth.getUserId(req.headers.authorization);
  req.body.pitcher = userId;

  if(/\W/.test(req.body.tags)){
    req.body.tags = req.body.tags.split(/\s+/);
    let tempArr = [];
    req.body.tags.forEach(tag=>{
      tag.replace(/[,?!^]/, "")
      if(tempArr.indexOf(tag) === -1 && tag){
        tempArr.push(tag);
      }
    })
    req.body.tags = tempArr;
  }

  req.body.administrators = [userId];

  Pitch.create(req.body, (err, pitch)=> {
    if (err) return res.status(499).send(err);
    User.findById(userId, (err, user) => {
      user.pitches.push(pitch._id);
      user.save(err=>{
        err ? res.status(499).send(err) : res.send(pitch);
      })
    })
  })
});


router.post('/addComment/', jwtAuth.middleware, (req,res)=>{
  const userId = jwtAuth.getUserId(req.headers.authorization);

  let commentObject = {
    commenter: userId,
    parentPitch: req.body.pitchId,
    body: req.body.comment
  };

  Comment.create(commentObject, (err, comment) =>{
    if (err) res.status(499).send(err);

    Pitch.findById(req.body.pitchId, (err, pitch)=>{
      pitch.comments.push(comment);

      pitch.save((err)=>{
        if (err) res.status(499).send(err);
        pitch.deepPopulate('tester comments comments.commenter', (err)=>{
          err ? res.status(499).send(err) : res.send(pitch);
        })
      })
    })
  })
})


router.post('/request', jwtAuth.middleware, (req, res) =>{
  const userId = jwtAuth.getUserId(req.headers.authorization);

  User.findById(userId, (err, sender)=>{
    if (err) return res.status(499).send(err);
    User.findById(req.body.pitcherId, (err, recipient) =>{
      if (err) return res.status(499).send(err);
      Pitch.findById(req.body.pitchId, (err, pitch)=>{
        if (err) return res.status(499).send(err);

        if(pitch.requestedUsers.indexOf(sender._id) !== -1){
          return res.status(450).send("You've already requested to be put on this project!")
        }
        pitch.requestedUsers.push(sender._id);
        pitch.save(err=>{
          if (err) return res.status(499).send(err);
        })

        const body = `Hi, ${recipient.username},\
        \n${sender.username} would \
        like to be added to your project ${pitch.title}. \
        Click here to accept, or click here to refuse.`;
        const subject = "New request!";

        let messageObject = {
          subject, body, recipient: recipient._id, sender: sender._id
        }

        Message.create(messageObject, (err, message)=>{
          if (err) return res.status(499).send(err);

          sender.messagesSent.push(message._id);
          recipient.messagesReceived.push(message._id);
          let errs = [];
          sender.save(err=>{
            if (err) return res.status(499).send(err);

          })
          recipient.save(err=>{
            if (err) return res.status(499).send(err);

            res.send("Request Sent");
          })
        })
      })
    })
  })
});


module.exports = router;
