'use strict';

import app from '../app.js';

app.service('User', ['$http', 'Auth', function($http, Auth){
  this.getCurrentUserInfo = () => {
    $http.defaults.headers.common.Authorization = `Bearer ${Auth.getToken()}`;
    return $http.get('/users/me')
    
  }
}])
