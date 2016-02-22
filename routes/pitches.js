'use strict';

let router = require('express').Router();
const jwtAuth = require('../config/auth.js');
const Pitch = require('../models/pitchSchema.js');
const Message = require('../models/messageSchema.js');
const Issue = require('../models/issueSchema.js');
const Suggestion = require('../models/suggestionSchema.js');
const User = require('../models/userSchema.js');
const Comment = require('../models/commentSchema.js');

router.get('/', (req, res) => {
  Pitch.find({}, (err, pitches) => {
    err ? res.status(499).send(err) : res.send(pitches);
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
  req.body.developers = [userId];

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

  const commentObject = {
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
    Pitch.findById(req.body.pitchId, (err, pitch)=>{
      if (err) return res.status(499).send(err);

      if(pitch.requestedUsers.indexOf(sender._id) !== -1){
        return res.status(450).send("You've already requested to be put on this project!")
      }
      pitch.requestedUsers.push(sender._id);
      pitch.save(err=>{
        if (err) return res.status(499).send(err);
      })

      var i = 0;
      pitch.administrators.forEach(admin =>{
        const body = `You have a new request from ${sender.username} \
        to be added to the project "${pitch.title}". Head toward \
        the admin panel to accept or reject!`;
        const subject = "New request!";
        const messageObject = {
          subject, body, recipient: admin, sender: sender._id
        }
        User.findById((err, administrator)=>{
          if (err) return res.status(499).send(err);
          Message.create(messageObject, (err, message)=>{
            if (err) return res.status(499).send(err);

            sender.messagesSent.push(message._id);
            administrator.messagesReceived.push(message._id);
            sender.save(err=>{
              if (err) return res.status(499).send(err);
            })

            administrator.save(err=>{
              if (err) return res.status(499).send(err);
              if(++i === pitch.administrators.length) res.end();
            })
          })
        })
      })
    })
  })
});

router.get('/details/:id', (req, res)=>{
  Pitch.findById(req.params.id)
  .populate('pitcher', 'username')
  .populate('administrators')
  .populate('issues', 'title')
  .exec( (err, pitch)=>{
    err ? res.status(499).send(err) : res.send(pitch);
  })
})

router.get('/one/:id', (req, res)=> {
  Pitch.findById(req.params.id).deepPopulate(['pitcher', "comments", "comments.commenter"]).exec( (err, pitch)=>{
    err ? res.status(499).send(err) : res.send(pitch);
  })
});

router.post('/addSuggestion/:id', (req, res)=>{
  Issue.findById( req.params.id, (err, issue)=>{
    if (err) return res.status(499).send(err);
    Suggestion.create(req.body, (err, suggestion)=>{
      if (err) return res.status(499).send(err);
      issue.suggestions.push(suggestion._id);
      issue.save((err)=>{
        err ? res.status(499).send(err) : res.send(suggestion);
      })
    })
  })
})

router.get('/issues/one/:id', (req, res)=>{
  Issue.findById(req.params.id, (err, issue)=>{
    err ? res.status(499).send(err) : res.send(issue)
  })
})


module.exports = router;
