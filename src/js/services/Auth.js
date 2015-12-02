'use strict';

import app from '../app.js';

app.service('Auth', ['$http', '$window', "localStorageKey", '$rootScope', '$state', function($http, $window, localStorageKey, $rootScope, $state){

  this.saveToken = (token) =>{
    $window.localStorage[localStorageKey] = token;
  };

  this.getToken = () =>{
    return $window.localStorage[localStorageKey];
  }

  this.isLoggedIn = () =>{
    var token = this.getToken();
    if(token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  this.currentUser = () =>{
    if(this.isLoggedIn()){
      var token = this.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.username;
    }
  };

  this.register = (user) =>{
    return $http.post('/users/register', user)
    .success( data => {
      this.saveToken(data.jwt);
      $rootScope.loggedIn = this.isLoggedIn();
      $state.go('me');
    })
    .catch(err => {
      console.log(err);
    })
  };

  this.login = (user) =>{
    return $http.post('/users/login', user)
    .success(data => {
      this.saveToken(data.jwt);
      $rootScope.loggedIn = this.isLoggedIn();
      $state.go('me');
    }).catch(err => {
      console.log(err);
    })
  };

  this.logOut = () =>{
    $window.localStorage.removeItem(localStorageKey);
    $rootScope.loggedIn = this.isLoggedIn();
    $rootScope.currentUser = null;
    $state.go('home')
  };

  $rootScope.loggedIn = this.isLoggedIn();
}])
