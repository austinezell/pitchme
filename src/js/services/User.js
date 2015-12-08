'use strict';

import app from '../app.js';

app.service('User', ['$http', 'Auth', '$rootScope', function($http, Auth, $rootScope){
  this.getCurrentUserInfo = () => {
    if (Auth.isLoggedIn()){
      $http.defaults.headers.common.Authorization = `Bearer ${Auth.getToken()}`;
      $http.get('/users/me')
      .then((data, err) => {
        if (err) console.log(err);
        $rootScope.currentUser = data.data;
        $rootScope.currentUser.unreadMessages = $rootScope.currentUser.messagesReceived.filter(message => {
          return !message.isRead;
        })
      })
    }
  }
}])
