'use strict'

let jwt = require('express-jwt');
let constants = require('./constants');
let jwtAuth = {};
let atob = require('atob');

jwtAuth.middleware = jwt({secret: constants.JWT_SECRET, userProperty: 'payload'});

jwtAuth.getUserId = (authHeader) =>{
  let jwt = authHeader.replace(/Bearer /, "");
  let stringPayload = atob(jwt.split('.')[1]);
  let objectPayload =JSON.parse(stringPayload)
  let userId = objectPayload._id;
  return userId;
}

module.exports = jwtAuth;
