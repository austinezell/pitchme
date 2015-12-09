'use strict';

import app from '../app.js';

app.service('User', ['$http', 'Auth', '$rootScope', function($http, Auth, $rootScope){
  this.getCurrentUserInfo = () => {
    if (Auth.isLoggedIn()){
      $http.defaults.headers.common.Authorization = `Bearer ${Auth.getToken()}`;
      return $http.get('/users/me')
      .success(data => {
        $rootScope.currentUser = data;
        $rootScope.currentUser.unreadMessages = $rootScope.currentUser.messagesReceived.filter(message => {
          return !message.isRead;
        })
      }).error(err =>{
        console.log(err);
      })
    }
  }
}])
