const router = require('express').Router();
const jwtAuth = require('../config/auth');
const Issue = require('../models/issueSchema');
const Suggestion = require('../models/suggestionSchema');
const Pitch = require('../models/pitchSchema');

router.post('/addSuggestion/:id', jwtAuth, (req, res)=>{
  req.body.suggestor = req.payload._id

  Issue.findById( req.params.id, (err, issue)=>{
    if (err) return res.status(499).send(err);
    Suggestion.create(req.body, (err, suggestion)=>{
      if (err) return res.status(499).send(err);
      issue.suggestions.push(suggestion._id);
      issue.save((err)=>{
        err ? res.status(499).send(err) : res.send({
          _id: suggestion._id,
          title: suggestion.title
        });
      })
    })
  })
})

router.get('/one/:id', (req, res)=>{
  Issue.findById(req.params.id)
  .populate('suggestions', 'title')
  .populate('reporter', 'username')
  .exec( (err, issue)=>{
    err ? res.status(499).send(err) : res.send(issue)
  })
})

router.post('/addIssue/:id', jwtAuth, (req, res) =>{
  req.body.reporter = req.payload._id

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

router.get('/suggestion/one/:id', (req, res)=>{
  Suggestion.findById(req.params.id)
  .populate('suggestor', 'username')
  .exec( (err, suggestion)=>{
    err ? res.status(499).send(err) : res.send(suggestion)
  })
})

module.exports = router;
