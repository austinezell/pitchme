'use strict'

let jwt = require('express-jwt');
let constants = require('./constants');

const jwtAuth = jwt({secret: constants.JWT_SECRET, userProperty: 'payload'});

module.exports = jwtAuth;
