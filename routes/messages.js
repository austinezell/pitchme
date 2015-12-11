"use strict";

let router = require('express').Router();
let Message = require('../models/messageSchema.js');

router.put('/read', (req, res)=>{
  Message.findByIdAndUpdate(req.body.id, req.body.update, (err)=>{
    err ? res.status(499).send(err) : res.end()
  })
})


module.exports = router
