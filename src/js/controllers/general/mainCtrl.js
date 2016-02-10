'use strict';

import app from '../../app.js';

app.controller('mainCtrl', ['User', function(User) {
  console.log('loaded');
  User.getCurrentUserInfo();
}]);
