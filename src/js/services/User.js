'use strict';
import app from '../app.js';

app.service('User', ['$http', 'Auth', '$rootScope', function($http, Auth, $rootScope){
  this.getCurrentUserInfo = () => {
    if (Auth.isLoggedIn()){
      $http.defaults.headers.common.Authorization = `Bearer ${Auth.getToken()}`;
      return $http.get('/users/me')
      .success(data => {
        $rootScope.currentUser = data;
      }).error(err =>{
        console.log(err);
      })
    }
  }

  this.update = (obj) => {
    return $http.put('/users/update', obj)
  }

  this.getProfileUser = (username) => {
    return $http.get(`/users/one/${username}`)
  }

  this.sendMessage = (message) => {
    $http.post('/users/sendMessage', {message})
    .success((data)=>{
      swal({
        title: "Message Sent",
        type: "success",
        text: "Message Successfully Sent",
        timer: 800
      })
    })
  }
}])
