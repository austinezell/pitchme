'use strict';

import app from '../app.js';

app.controller('mainCtrl', ['User', function(User) {
  User.getCurrentUserInfo();
}]);
